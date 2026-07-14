import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import {
  ALTERNATIVES_CATEGORIES,
  MAC_CATEGORIES,
  SH_CATEGORIES,
  TOOL_CATEGORIES,
} from './data/categories';

const blogSchema = z.object({
  title: z.string(),
  publishedDate: z.coerce.date(),
  description: z.string(),
  author: z.string(),
  tags: z.array(z.string()),
  image: z.string().optional(),
});

const baseSchema = z.object({
  title: z.string(),
  publishedDate: z.coerce.date(),
  logo: z.string(),
  uiImage: z.string(),
  description: z.string(),
  keyFeatures: z.array(z.string()),
  youtubeId: z.string().optional(),
});

const selfHostedSchema = baseSchema.extend({
  category: z.enum(SH_CATEGORIES),
  alternativeTo: z.string(),
  checkItUrl: z.string().url(),
});

const toolsSchema = baseSchema.extend({
  category: z.enum(TOOL_CATEGORIES),
  checkItUrl: z.string().url(),
});

const alternativesSchema = baseSchema.extend({
  category: z.enum(ALTERNATIVES_CATEGORIES),
  alternativeTo: z.string().optional(),
});

const macSchema = baseSchema.extend({
  category: z.enum(MAC_CATEGORIES),
  pricing: z.enum(['Free', 'Paid', 'Freemium']),
  checkItUrl: z.string().url(),
  alternativeTo: z.string().optional(),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: blogSchema,
});

const sh = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/sh' }),
  schema: selfHostedSchema,
});

const tools = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/tools' }),
  schema: toolsSchema,
});

const alternatives = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/alternatives' }),
  schema: alternativesSchema,
});

const mac = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/mac' }),
  schema: macSchema,
});

export const collections = {
  blog,
  sh,
  tools,
  alternatives,
  mac,
};

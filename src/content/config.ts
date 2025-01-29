import { defineCollection, z } from 'astro:content';

const baseSchema = z.object({
  title: z.string(),
  publishedDate: z.date(),
  logo: z.string(),
  uiImage: z.string(),
  description: z.string(),
  keyFeatures: z.array(z.string()),
  category: z.string(),
});

// Self-hosted apps schema (includes alternativeTo)
const selfHostedSchema = baseSchema.extend({
  alternativeTo: z.string(),
  checkItUrl: z.string(),
});

// Online tools schema
const toolsSchema = baseSchema.extend({
  checkItUrl: z.string(),
});

// Alternatives schema
const alternativesSchema = baseSchema.extend({
  alternativeTo: z.string(),
});

// Define collections
export const collections = {
  'sh': defineCollection({
    type: 'content',
    schema: selfHostedSchema,
  }),
  'tools': defineCollection({
    type: 'content',
    schema: toolsSchema,
  }),
  'alternatives': defineCollection({
    type: 'content',
    schema: alternativesSchema,
  }),
};
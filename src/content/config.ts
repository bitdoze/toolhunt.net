import { defineCollection, z } from 'astro:content';

const baseSchema = z.object({
  title: z.string(),
  publishedDate: z.date(),
  logo: z.string(),
  uiImage: z.string(),
  description: z.string(),
  keyFeatures: z.array(z.string()),
  category: z.string(),
  youtubeId: z.string().optional(), // Add this line
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

// Mac apps schema
const macSchema = baseSchema.extend({
  pricing: z.enum(['Free', 'Paid', 'Freemium']),
  checkItUrl: z.string(),
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
  'mac': defineCollection({
    type: 'content',
    schema: macSchema,
  }),
};
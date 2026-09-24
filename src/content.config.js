import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const entries = defineCollection({
  // One folder per topic: src/content/entries/<topic>/<entry>.md
  loader: glob({ pattern: '*/*.md', base: './src/content/entries' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    order: z.number().int().positive(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { entries };

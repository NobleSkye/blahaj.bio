import { defineCollection, z } from 'astro:content';

const bios = defineCollection({
  schema: z.object({
    username: z.string(),
    display_name: z.string(),
    pronouns: z.string().optional().default(""),
    bio: z.string().optional().default(""),
    links: z
      .array(z.object({ title: z.string(), url: z.string() }))
      .optional()
      .default([]),
  }),
});

export const collections = { bios };
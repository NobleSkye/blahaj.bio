import { defineCollection, z } from 'astro:content';

export const collections = {
  bios: defineCollection({
    type: 'content',
    schema: z.object({
      username: z.string(),
      display_name: z.string(),
      pronouns: z.string(),
      bio: z.string(),
      links: z.string().optional(),
    }),
  }),
};
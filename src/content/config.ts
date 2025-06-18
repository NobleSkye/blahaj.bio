import { defineCollection, z } from 'astro:content';

export const collections = {
  bios: defineCollection({
    type: 'content',
    schema: z.object({
      username: z.string(),
      display_name: z.string(),
      pronouns: z.string(),
      bio: z.string(),
      links: z.union([
        z.string(), // For backward compatibility with simple link strings
        z.array(z.object({
          title: z.string(),
          url: z.string(),
        }))
      ]).optional(),
    }),
  }),
};
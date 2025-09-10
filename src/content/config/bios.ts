import { defineCollection, z } from 'astro:content';

export const bios = defineCollection({
  type: 'content',
  schema: z.object({
    username: z.string(),
    display_name: z.string(),
    pronouns: z.string().optional(),
    bio: z.string(),
    links: z.array(z.object({ title: z.string(), url: z.string().url() })).default([])
  })
});

export const collections = {
  bios
};

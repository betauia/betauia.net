import { defineCollection, z } from "astro:content";

const genfors = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    description: z.string().optional(),
  }),
});

export const collections = {
  genfors,
};

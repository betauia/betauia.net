import { defineCollection, z } from "astro:content";

const exams = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    href: z.string().url(),
    year: z.string(),
    examNumber: z.string(),
    score: z.string(),
    nickname: z.string(),
  }),
});

export const collections = {
  exams,
};

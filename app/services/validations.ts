import { z } from "zod";

export const vCreatePost = z.object({
  title: z.string().optional(),
  body: z.string().min(1),
});

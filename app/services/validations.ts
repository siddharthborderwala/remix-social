import { z } from "zod";

export const vCreatePost = z.object({
  title: z.string().min(3),
  body: z.string().min(3),
});

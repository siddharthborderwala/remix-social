import { z } from "zod";

export const vCreatePost = z.object({
  title: z.string().min(3),
  body: z.string().min(3),
});

export const vUserSignup = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(6, "The password should be at least 6 characters long")
    .max(20, "The password should be at max 20 characters long")
    .regex(
      /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{6,20}$/
    ),
});

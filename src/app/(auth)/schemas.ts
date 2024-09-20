import { z } from "zod";

export const SignInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(24, "Password must be at most 24 characters"),
});

export const SignUpFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .object({
      base: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(24, "Password must be at most 24 characters"),
      confirmation: z.string(),
    })
    .refine(
      (data) => data.base === data.confirmation,
      "Passwords do not match"
    ),
});

export type SignInFormValues = z.infer<typeof SignInFormSchema>;
export type SignUpFormValues = z.infer<typeof SignUpFormSchema>;

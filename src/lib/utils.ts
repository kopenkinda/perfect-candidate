import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes));

export const zodError = (error: z.ZodError) =>
  error.errors.map((e) => e.message).join("\n");

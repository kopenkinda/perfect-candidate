"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AtSignIcon, LockIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { FormControl } from "~/components/ui/form-control";
import { Input } from "~/components/ui/input";
import { ShowPasswordButton } from "../show-password-button";

const SignUpFormSchema = z.object({
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
type SignUpFormValues = z.infer<typeof SignUpFormSchema>;

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const form = useForm<SignUpFormValues>({
    defaultValues: {},
    resolver: zodResolver(SignUpFormSchema),
  });
  return (
    <form
      onSubmit={form.handleSubmit((data) => {
        console.log(data);
      })}
    >
      <h1 className="text-center font-bold">Create an account</h1>
      <FormControl label="Email" error={form.formState.errors.email?.message}>
        <Input
          start={<AtSignIcon className="w-4 h-4" />}
          placeholder="john@example.com"
          {...form.register("email")}
        />
      </FormControl>
      <FormControl
        label="Password"
        error={form.formState.errors.password?.base?.message}
      >
        <Input
          start={<LockIcon className="w-4 h-4" />}
          end={
            <ShowPasswordButton
              showing={showPassword}
              control={setShowPassword}
            />
          }
          type={showPassword ? "text" : "password"}
          {...form.register("password.base")}
        />
      </FormControl>
      <FormControl
        label="Repeat password"
        error={form.formState.errors.password?.root?.message}
      >
        <Input
          start={<LockIcon className="w-4 h-4" />}
          type={showPasswordConfirmation ? "text" : "password"}
          end={
            <ShowPasswordButton
              showing={showPasswordConfirmation}
              control={setShowPasswordConfirmation}
            />
          }
          {...form.register("password.confirmation")}
        />
      </FormControl>
      <Button variant="primary" wide="full" className="mt-2">
        Create an account
      </Button>
    </form>
  );
}

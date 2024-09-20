"use client";

import { AtSignIcon, LockIcon } from "lucide-react";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { FormControl } from "~/components/ui/form-control";
import { Input } from "~/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { ShowPasswordButton } from "../show-password-button";

const SignInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(24, "Password must be at most 24 characters"),
});

type SignInFormValues = z.infer<typeof SignInFormSchema>;

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<SignInFormValues>({
    defaultValues: {},
    resolver: zodResolver(SignInFormSchema),
    mode: "onChange",
  });
  return (
    <form
      onSubmit={form.handleSubmit((values) => {
        console.log(values);
      })}
    >
      <h1 className="text-center font-bold">Sign in</h1>
      <FormControl label="Email" error={form.formState.errors.email?.message}>
        <Input
          start={<AtSignIcon className="w-4 h-4" />}
          placeholder="john@example.com"
          {...form.register("email")}
        />
      </FormControl>
      <FormControl
        label="Password"
        error={form.formState.errors.password?.message}
      >
        <Input
          start={<LockIcon className="w-4 h-4" />}
          type={showPassword ? "text" : "password"}
          end={
            <ShowPasswordButton
              control={setShowPassword}
              showing={showPassword}
            />
          }
          placeholder="******"
          {...form.register("password")}
        />
      </FormControl>
      <Button variant="primary" wide="full" className="mt-2">
        Log in with credentials
      </Button>
    </form>
  );
}

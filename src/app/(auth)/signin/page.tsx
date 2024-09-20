"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { routes } from "~/auth/routes";
import { Alert } from "~/components/ui/alert";
import { Icon } from "~/components/ui/app-icon";
import { Button } from "~/components/ui/button";
import { FormControl } from "~/components/ui/form-control";
import { Input } from "~/components/ui/input";
import { type AuthActionResult, login } from "../actions";
import { SignInFormSchema, SignInFormValues } from "../schemas";
import { ShowPasswordButton } from "../show-password-button";

export default function SignInPage({
  searchParams: { callbackUrl },
}: {
  searchParams: { callbackUrl?: string };
}) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuthActionResult | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<SignInFormValues>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(SignInFormSchema),
    mode: "onChange",
  });
  return (
    <form
      onSubmit={form.handleSubmit(async (values) => {
        setLoading(true);
        const result = await login(values, callbackUrl);
        setLoading(false);
        setResult(result);
      })}
    >
      {result?.success === true && (
        <Alert variant="success" className="mb-2">
          <span>{result.message ?? "Logged in"}</span>
          <Button size="sm" asChild>
            <Link href={routes.DEFAULT_LOGIN_REDIRECT}>Go to app</Link>
          </Button>
        </Alert>
      )}
      {result?.success === false && (
        <Alert variant="error" className="mb-2">
          <span>{result.error ?? "Error logging in"}</span>
        </Alert>
      )}
      <h1 className="text-center font-bold">Sign in</h1>
      <FormControl label="Email" error={form.formState.errors.email?.message}>
        <Input
          start={<Icon name="AtSign" className="w-4 h-4" />}
          placeholder="john@example.com"
          {...form.register("email")}
        />
      </FormControl>
      <FormControl
        label="Password"
        error={form.formState.errors.password?.message}
      >
        <Input
          start={<Icon name="Lock" className="w-4 h-4" />}
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
      <Button
        variant="primary"
        wide="full"
        className="mt-2"
        disabled={loading || result?.success === true}
      >
        Log in with credentials
      </Button>
    </form>
  );
}

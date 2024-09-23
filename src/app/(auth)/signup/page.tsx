"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { FormControl } from "~/components/ui/form-control";
import { Input } from "~/components/ui/input";
import { SignUpFormSchema, SignUpFormValues } from "../schemas";
import { ShowPasswordButton } from "../show-password-button";
import { login, register } from "../actions";
import { Alert } from "~/components/ui/alert";
import Link from "next/link";
import { routes } from "~/auth/routes";
import { Icon } from "~/components/ui/app-icon";
import type { ActionResult, NonExclusiveString } from "~/lib/actions.utils";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ActionResult<
    NonExclusiveString,
    null
  > | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const form = useForm<SignUpFormValues>({
    defaultValues: {
      email: "",
      password: { base: "", confirmation: "" },
    },
    resolver: zodResolver(SignUpFormSchema),
  });
  return (
    <form
      onSubmit={form.handleSubmit(async (data) => {
        setLoading(true);
        const result = await register(data);
        if (result.success) {
          await login({ email: data.email, password: data.password.base });
        }
        setLoading(false);
        setResult(result);
      })}
    >
      {result?.success === true && (
        <Alert variant="success" className="mb-2">
          <span>{result.data ?? "Account created"}</span>
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
      <h1 className="text-center font-bold">Create an account</h1>
      <FormControl label="Email" error={form.formState.errors.email?.message}>
        <Input
          start={<Icon name="AtSign" />}
          placeholder="john@example.com"
          {...form.register("email")}
        />
      </FormControl>
      <FormControl
        label="Password"
        error={form.formState.errors.password?.base?.message}
      >
        <Input
          start={<Icon name="Lock" />}
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
          start={<Icon name="Lock" />}
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
      <Button
        variant="primary"
        size="full"
        className="mt-2"
        disabled={loading || result?.success === true}
      >
        Create an account
      </Button>
    </form>
  );
}

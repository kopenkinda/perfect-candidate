"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { SignUpFormSchema, SignUpFormValues } from "../schemas";
import { ShowPasswordButton } from "../show-password-button";
import { login, register } from "../actions";
import { Alert, AlertTitle } from "~/components/ui/alert";
import Link from "next/link";
import { routes } from "~/auth/routes";
import { Icon } from "~/components/ui/app-icon";
import type { ActionResult, NonExclusiveString } from "~/lib/actions.utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

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
    <Form {...form}>
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
        {result?.success === false && (
          <Alert variant="destructive" className="mb-2">
            <AlertTitle>{result.error ?? "Error logging in"}</AlertTitle>
          </Alert>
        )}
        <h1 className="text-center font-bold">Create an account</h1>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Icon name="AtSign" /> Email
              </FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password.base"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Icon name="Lock" /> Password
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="********"
                  {...field}
                  type={showPassword ? "text" : "password"}
                />
                {/* <ShowPasswordButton
                  showing={showPassword}
                  control={setShowPassword}
                /> */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password.confirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Icon name="Lock" /> Repeat Password
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="********"
                  {...field}
                  type={showPasswordConfirmation ? "text" : "password"}
                />
                {/* <ShowPasswordButton
                  showing={showPasswordConfirmation}
                  control={setShowPasswordConfirmation}
                /> */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="mt-2 w-full"
          disabled={loading || result?.success === true}
        >
          Create an account
        </Button>
      </form>
    </Form>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, AlertTitle } from "~/components/ui/alert";
import { Icon } from "~/components/ui/app-icon";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import type { ActionResult, NonExclusiveString } from "~/lib/actions.utils";
import { login } from "../actions";
import { SignInFormSchema, SignInFormValues } from "../schemas";

export default function SignInPage({
  searchParams: { callbackUrl },
}: {
  searchParams: { callbackUrl?: string };
}) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ActionResult<
    NonExclusiveString,
    null
  > | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<SignInFormValues>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(SignInFormSchema),
    mode: "onChange",
  });
  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(async (values) => {
          setLoading(true);
          const result = await login(values, callbackUrl);
          setLoading(false);
          setResult(result);
        })}
      >
        {result?.success === false && (
          <Alert variant="destructive" className="mb-2">
            <AlertTitle>{result.error ?? "Error logging in"}</AlertTitle>
          </Alert>
        )}
        <h1 className="text-center font-bold">Sign in</h1>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Icon name="AtSign" /> Email
              </FormLabel>
              <FormControl>
                <Input placeholder="Ex: john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
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
                  control={setShowPassword}
                  showing={showPassword}
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
          Log in with credentials
        </Button>
      </form>
    </Form>
  );
}

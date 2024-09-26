"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
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
import { login, register } from "../actions";
import {
  FIELD_VALIDATIONS,
  SignUpFormSchema,
  SignUpFormValues,
} from "../schemas";
import { ShowPasswordButton } from "../show-password-button";
import { cn } from "~/lib/utils";

export default function SignupPage({
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
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const form = useForm<SignUpFormValues>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
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
            await login(
              { email: data.email, password: data.password },
              callbackUrl
            );
          }
          setLoading(false);
          setResult(result);
        })}
      >
        {result?.success === false && (
          <Alert variant="destructive" className="mb-2">
            <Icon name="CircleX" />
            <AlertTitle>Oops!</AlertTitle>
            <AlertDescription>
              {result.error ?? "Error signing up"}
            </AlertDescription>
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
          name="password"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>
                <Icon name="Lock" /> Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="********"
                    {...field}
                    type={showPassword ? "text" : "password"}
                  />
                  <ShowPasswordButton
                    showing={showPassword}
                    control={setShowPassword}
                  />
                  {fieldState.error !== undefined && (
                    <ul className="space-y-0.5 mt-1">
                      {FIELD_VALIDATIONS.map(([test, message], idx) => (
                        <li
                          key={idx}
                          className={cn(
                            "text-sm",
                            test(field.value)
                              ? "text-green-500"
                              : "text-red-500"
                          )}
                        >
                          {message}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Icon name="Lock" /> Repeat Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="********"
                    {...field}
                    type={showPasswordConfirmation ? "text" : "password"}
                  />
                  <ShowPasswordButton
                    showing={showPasswordConfirmation}
                    control={setShowPasswordConfirmation}
                  />
                </div>
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

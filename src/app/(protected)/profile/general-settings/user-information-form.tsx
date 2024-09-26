"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { updateUserInformationAction } from "./general-settings.actions";
import {
  UserInformationForm as TUserInformationForm,
  UserInformationSchema,
} from "./schemas";

export interface UserInformationFormProps {
  info: TUserInformationForm;
}

export const UserInformationForm = (props: UserInformationFormProps) => {
  const [updated, setUpdated] = useState(false);
  const [loadedName, setLoadedName] = useState(props.info.name);
  const [loadedEmail, setLoadedEmail] = useState(props.info.email);

  const form = useForm<TUserInformationForm>({
    defaultValues: {
      name: props.info.name,
      email: props.info.email,
    },
    resolver: zodResolver(UserInformationSchema),
  });

  const onSubmit = async (data: TUserInformationForm) => {
    let changed = false;
    if (data.email !== loadedEmail) {
      await updateUserInformationAction("email", data.email);
      setLoadedEmail(data.email);
      changed = true;
    }
    if (data.name !== loadedName) {
      await updateUserInformationAction("name", data.name);
      setLoadedName(data.name);
      changed = true;
    }
    if (!changed) {
      return;
    }
    setUpdated(true);
    setTimeout(() => setUpdated(false), 1000);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-[minmax(0,_1fr)_minmax(0,_1fr)_auto] gap-2 items-end"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Icon name="AtSign" />
                Email
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Icon name="User" />
                Name
              </FormLabel>
              <FormControl>
                <Input placeholder="Ex: John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={updated}
          type="submit"
          className="col-span-3 md:col-span-1"
        >
          <Icon name={updated ? "Check" : "Save"} />
        </Button>
      </form>
    </Form>
  );
};

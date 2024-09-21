"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  UserInformationForm as TUserInformationForm,
  UserInformationSchema,
} from "./schemas";
import { FormControl } from "~/components/ui/form-control";
import { Input } from "~/components/ui/input";
import { Icon } from "~/components/ui/app-icon";
import { Button } from "~/components/ui/button";
import { updateUserInformationAction } from "./general-settings.actions";
import { useState } from "react";

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
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="grid grid-cols-[minmax(0,_1fr)_minmax(0,_1fr)_auto] gap-2"
    >
      <FormControl
        label={
          <>
            <Icon name="AtSign" />
            Email
          </>
        }
        error={form.formState.errors.email?.message}
        className="col-span-3 md:col-span-1"
      >
        <Input {...form.register("email")} />
      </FormControl>
      <FormControl
        label={
          <>
            <Icon name="User" />
            Name
          </>
        }
        error={form.formState.errors.name?.message}
        className="col-span-3 md:col-span-1"
      >
        <Input
          {...form.register("name")}
        />
      </FormControl>
      <Button
        disabled={updated}
        type="submit"
        className="col-span-3 md:col-span-1 md:mt-9"
      >
        <Icon name={updated ? "Check" : "Save"} />
      </Button>
    </form>
  );
};

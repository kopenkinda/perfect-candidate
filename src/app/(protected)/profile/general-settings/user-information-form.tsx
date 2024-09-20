"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserInformation, UserInformationSchema } from "./schemas";
import { FormControl } from "~/components/ui/form-control";
import { Input } from "~/components/ui/input";
import { Icon } from "~/components/ui/app-icon";
import { Button } from "~/components/ui/button";
import { updateUserInformationAction } from "./general-settings.actions";
import { useState } from "react";

export interface UserInformationFormProps {
  info: UserInformation;
}

export const UserInformationForm = (props: UserInformationFormProps) => {
  const [updated, setUpdated] = useState(false);
  const [loadedName, setLoadedName] = useState(props.info.name);
  const [loadedEmail, setLoadedEmail] = useState(props.info.email);

  const form = useForm<UserInformation>({
    defaultValues: {
      name: props.info.name,
      email: props.info.email,
    },
    resolver: zodResolver(UserInformationSchema),
  });

  const onSubmit = async (data: UserInformation) => {
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
      className="flex gap-2 items-start"
    >
      <FormControl label="Email" error={form.formState.errors.email?.message}>
        <Input start={<Icon name="AtSign" />} {...form.register("email")} />
      </FormControl>
      <FormControl
        label="Full Name"
        error={form.formState.errors.name?.message}
      >
        <Input start={<Icon name="User" />} {...form.register("name")} />
      </FormControl>
      <Button size="square" disabled={updated} type="submit" className='mt-9'>
        <Icon name={updated ? "Check" : "Save"} />
      </Button>
    </form>
  );
};

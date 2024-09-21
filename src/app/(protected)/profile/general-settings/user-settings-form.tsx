"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserSettings as TUserSettings } from "@prisma/client";
import { useForm } from "react-hook-form";
import { Alert, AlertActions } from "~/components/ui/alert";
import { GenderSelector } from "./gender-selector";
import { UserSettingsForm, UserSettingsSchema } from "./schemas";
import { Button } from "~/components/ui/button";
import { Icon } from "~/components/ui/app-icon";
import { updateUserSettingsAction } from "./general-settings.actions";
import { FormControl } from "~/components/ui/form-control";
import { Input } from "~/components/ui/input";

export interface UserSettingsProps {
  settings: TUserSettings;
}

export const UserSettings = (props: UserSettingsProps) => {
  const form = useForm<UserSettingsForm>({
    defaultValues: {
      gender: props.settings.sex,
      age: props.settings.age,
      phone: props.settings.phone,
      location: props.settings.location,
    },
    mode: "onChange",
    resolver: zodResolver(UserSettingsSchema),
  });
  const modifiedData = form.formState.isDirty;

  const onSubmit = async (data: UserSettingsForm) => {
    if (!modifiedData) return;
    if (form.formState.dirtyFields.gender) {
      await updateUserSettingsAction("sex", data.gender);
    }
    if (form.formState.dirtyFields.phone) {
      await updateUserSettingsAction("phone", data.phone);
    }
    if (form.formState.dirtyFields.age) {
      await updateUserSettingsAction("age", data.age);
    }
    if (form.formState.dirtyFields.location) {
      await updateUserSettingsAction("location", data.location);
    }
    form.reset(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid grid-cols-3 gap-2">
        <FormControl
          label={
            <>
              <Icon name="Calendar" />
              Age
            </>
          }
          error={form.formState.errors.age?.message}
          className="col-span-3 md:col-span-1"
        >
          <Input type="number" min="1" max="110" {...form.register("age")} />
        </FormControl>
        <FormControl
          label={
            <>
              <Icon name="Phone" />
              Phone
            </>
          }
          error={form.formState.errors.phone?.message}
          className="col-span-3 md:col-span-2"
        >
          <Input type="tel" {...form.register("phone")} />
        </FormControl>
      </div>
      <FormControl
        label={
          <>
            <Icon name="MapPin" />
            Location
          </>
        }
        error={form.formState.errors.location?.message}
      >
        <Input type="text" {...form.register("location")} />
      </FormControl>
      <GenderSelector
        gender={props.settings.sex}
        onValueChange={(g) => form.setValue("gender", g, { shouldDirty: true })}
      />
      {modifiedData && (
        <Alert variant="warning" className="mt-2">
          You have unsaved changes
          <AlertActions>
            <Button size="sm">
              <Icon name="Save" />
              save
            </Button>
          </AlertActions>
        </Alert>
      )}
    </form>
  );
};

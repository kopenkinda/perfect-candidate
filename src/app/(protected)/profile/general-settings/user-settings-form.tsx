"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserSettings as TUserSettings } from "@prisma/client";
import { useForm } from "react-hook-form";
import { Alert } from "~/components/ui/alert";
import { GenderSelector } from "./gender-selector";
import { UserSettingsForm, UserSettingsSchema } from "./schemas";
import { Button } from "~/components/ui/button";
import { Icon } from "~/components/ui/app-icon";
import { updateUserSettingsAction } from "./general-settings.actions";
import { Input } from "~/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

export interface UserSettingsProps {
  settings: TUserSettings;
}

export const UserSettings = (props: UserSettingsProps) => {
  const form = useForm<UserSettingsForm>({
    defaultValues: {
      gender: props.settings.sex,
      age: props.settings.age,
      phone: props.settings.phone ?? "",
      location: props.settings.location ?? "",
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-2">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem className="col-span-3 md:col-span-1">
                <FormLabel>
                  <Icon name="Calendar" />
                  Age
                </FormLabel>
                <FormControl>
                  <Input type="number" min="1" max="110" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="col-span-3 md:col-span-2">
                <FormLabel>
                  <Icon name="Phone" />
                  Phone
                </FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="col-span-3 md:col-span-2">
              <FormLabel>
                <>
                  <Icon name="MapPin" />
                  Location
                </>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <GenderSelector
          gender={props.settings.sex}
          onValueChange={(g) =>
            form.setValue("gender", g, { shouldDirty: true })
          }
        />
        {modifiedData && (
          <Alert className="mt-2">
            You have unsaved changes
            <Button size="sm">
              <Icon name="Save" />
              save
            </Button>
          </Alert>
        )}
      </form>
    </Form>
  );
};

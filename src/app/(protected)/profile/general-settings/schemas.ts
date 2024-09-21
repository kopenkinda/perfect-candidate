import { z } from "zod";

export const LONGEST_NAME_IN_THE_WORLD =
  "Hubert Blaine Wolfeschlegelsteinhausenbergerdorff Senior";

export const OLDEST_PERSON_IN_THE_WORLD = 122;

export const UserInformationSchema = z.object({
  name: z
    .string()
    .min(1, "Your name is required")
    .max(
      LONGEST_NAME_IN_THE_WORLD.length,
      "Your name is longer than the longest name in the world. Maybe it's time to send an email to the Guinness World Records? :)"
    ),
  email: z.string().email("Invalid email"),
});

export type UserInformationForm = z.infer<typeof UserInformationSchema>;

export const UserSettingsSchema = z.object({
  gender: z.string().min(1, "Please select a gender").nullable(),
  phone: z.string().min(1, "Please enter a phone number").nullable(),
  location: z.string().min(1, "Please enter a location").nullable(),
  age: z.coerce
    .number()
    .min(1, "Please enter a valid age")
    .max(
      OLDEST_PERSON_IN_THE_WORLD,
      "You are older than the oldest person in the world. Maybe it's time to send an email to the Guinness World Records? :)"
    ),
});

export type UserSettingsForm = z.infer<typeof UserSettingsSchema>;

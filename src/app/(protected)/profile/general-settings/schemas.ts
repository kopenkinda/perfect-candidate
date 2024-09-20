import { z } from "zod";

export const LONGEST_NAME_IN_THE_WORLD =
  "Hubert Blaine Wolfeschlegelsteinhausenbergerdorff Senior";

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

export type UserInformation = z.infer<typeof UserInformationSchema>;

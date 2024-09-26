import Link from "next/link";
import { user } from "~/auth";
import { Alert, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { getUserProfileCompletion } from "~/lib/db/user";

export interface UserProfileCompletionProps {
  className?: string;
}

export const UserProfileCompletion = async (
  props: UserProfileCompletionProps
) => {
  const session = await user();
  if (!session) {
    return null;
  }
  const completion = await getUserProfileCompletion(session.id);

  if (completion === 100) {
    return null;
  }

  return (
    <Alert className={props.className}>
      <AlertTitle>Your profile is incomplete</AlertTitle>
      <Button size="sm" asChild>
        <Link href="/profile">Provide information</Link>
      </Button>
    </Alert>
  );
};

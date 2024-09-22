import Link from "next/link";
import { user } from "~/auth";
import { Alert, AlertActions } from "~/components/ui/alert";
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
    <Alert
      className={props.className}
      variant={completion >= 50 ? "warning" : "error"}
    >
      <span>Your profile is incomplete</span>
      <AlertActions>
        <Button size="sm" asChild>
          <Link href="/profile">Provide information</Link>
        </Button>
      </AlertActions>
    </Alert>
  );
};

import Link from "next/link";
import { routes } from "~/auth/routes";
import { Button } from "~/components/ui/button";

export default async function AuthErrorPage() {
  return (
    <div>
      <h1 className="font-bold text-center mb-2">Oops! An Error has ocurred</h1>
      <Button asChild size="full" variant="primary">
        <Link href={routes.LOGIN}>Go back</Link>
      </Button>
    </div>
  );
}

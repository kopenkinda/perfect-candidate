import { UserProfileCompletion } from "./profile-completion";
import { ApplicationShell } from "./shell";

export default async function ApplicationLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ApplicationShell>
      <UserProfileCompletion className="col-span-7 md:col-span-5 mb-4" />
      {children}
    </ApplicationShell>
  );
}

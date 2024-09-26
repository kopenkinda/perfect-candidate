import { UserProfileCompletion } from "./profile-completion";
import { ApplicationShell } from "./shell";

export default async function ApplicationLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ApplicationShell>
      <UserProfileCompletion />
      {children}
    </ApplicationShell>
  );
}

import { api, HydrateClient } from "~/lib/trpc/server";
import {
  AppSection,
  AppSectionContent,
  AppSectionDescription,
  AppSectionHeader,
  AppSectionTitle,
} from "./(protected)/app-section";
import { user } from "~/auth";
import { ClientHomepageProtectedTest, ClientHomepageTest } from "./client-test";

export default async function Home() {
  const data = await api.profile.hello({ text: "me" });
  const session = await user();
  await api.profile.getSecretMessage.prefetch();
  await api.profile.hello.prefetch({ text: "me" });
  const secret =
    session !== undefined ? await api.profile.getSecretMessage() : null;
  return (
    <HydrateClient>
      <div className="grid lg:grid-cols-3">
        <AppSection className="border-b lg:border-r">
          <AppSectionHeader>
            <AppSectionTitle>Homepage</AppSectionTitle>
            <AppSectionDescription>
              We test stuff out here for now
            </AppSectionDescription>
          </AppSectionHeader>
          <AppSectionContent>{data.greeting}</AppSectionContent>
        </AppSection>
        <AppSection className="border-b lg:border-r">
          <AppSectionHeader>
            <AppSectionTitle>Protected test</AppSectionTitle>
            <AppSectionDescription>
              We test protected stuff here
            </AppSectionDescription>
          </AppSectionHeader>
          <AppSectionContent>{secret ?? "Not logged in"}</AppSectionContent>
        </AppSection>
        <AppSection className="border-b">
          <AppSectionHeader>
            <AppSectionTitle>Client test</AppSectionTitle>
            <AppSectionDescription>
              We test client protected stuff here
            </AppSectionDescription>
          </AppSectionHeader>
          <AppSectionContent>
            <ClientHomepageTest />
            <ClientHomepageProtectedTest />
          </AppSectionContent>
        </AppSection>
      </div>
    </HydrateClient>
  );
}

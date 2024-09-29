"use client";

import { useUser } from "~/hooks/use-user";
import { api } from "~/lib/trpc/react";

export const ClientHomepageTest = () => {
  const data = api.profile.hello.useQuery({ text: "me" });

  return (
    <div>
      Public:{" "}
      {data.isLoading ? "loading..." : data.data?.greeting ?? "No greeting?"}
    </div>
  );
};

export const ClientHomepageProtectedTest = () => {
  const session = useUser();
  const secret = api.profile.getSecretMessage.useQuery(undefined, {
    enabled: session !== undefined,
  });
  return (
    <div>
      Protected:{" "}
      {session === undefined
        ? "Please log in to view data"
        : secret.isLoading
        ? "loading..."
        : secret.data}
    </div>
  );
};

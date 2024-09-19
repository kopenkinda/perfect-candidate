import { env } from "./env";

export const fetchInternal = (
  path: `/${string}`,
  init: RequestInit | undefined
) => {
  const url = env.NEXTAUTH_URL + "/api" + path;
  console.log({ url });
  return fetch(url, init);
};

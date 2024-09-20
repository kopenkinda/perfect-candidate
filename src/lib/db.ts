import { PrismaClient } from "@prisma/client";

import { env } from "~/lib/env";

const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;


export const getUserByEmail = async (email: string) => {
  return await db.user.findUnique({
    where: { email },
  });
};

export const getUserById = async (id: string) => {
  return await db.user.findUnique({
    where: { id },
  });
};

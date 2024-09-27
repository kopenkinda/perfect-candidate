import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { env } from "../env";
import schema from "../../drizzle/schema";

const sql = neon(env.DATABASE_URL);
const createDrizzleClient = () => drizzle(sql, { schema });

const globalForDrizzle = globalThis as unknown as {
  drizzle: ReturnType<typeof createDrizzleClient> | undefined;
};

export const db = globalForDrizzle.drizzle ?? createDrizzleClient();

if (env.NODE_ENV !== "production") globalForDrizzle.drizzle = db;

export type UnmodifiableTableProperties =
  | "userId"
  | "id"
  | "createdAt"
  | "updatedAt";

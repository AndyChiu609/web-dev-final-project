import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

import { privateEnv } from "@/lib/env/private";

const client = new Client({
  connectionString: privateEnv.POSTGRES_URL,
  connectionTimeoutMillis: 5000,
});
await client.connect();
export const db = drizzle(client);

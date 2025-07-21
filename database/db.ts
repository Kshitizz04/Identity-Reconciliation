import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { DB_URI } from "../config/env";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

const sql = neon(DB_URI);
export const db = drizzle({ client: sql });

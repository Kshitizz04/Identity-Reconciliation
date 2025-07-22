import { config } from 'dotenv';
import { defineConfig } from "drizzle-kit";
import { DB_URI } from './config/env';

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export default defineConfig({
  schema: "./database/schema.js",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: DB_URI,
  },
});

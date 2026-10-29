import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

// Strip channel_binding param — incompatible with the pg driver used by drizzle-kit
const url = (process.env.DATABASE_URL ?? "")
  .replace(/[?&]channel_binding=[^&]*/g, (m) => (m.startsWith("?") ? "?" : ""))
  .replace(/\?$/, "");

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url },
});

import type { Config } from "drizzle-kit";

// Strip channel_binding param — incompatible with the pg driver used by drizzle-kit
const url = (process.env.DATABASE_URL ?? "").replace(/[?&]channel_binding=[^&]*/g, (m) =>
  m.startsWith("?") ? "?" : ""
).replace(/\?$/, "");

export default {
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url },
} satisfies Config;

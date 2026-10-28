/**
 * Neon service clients initialised from env vars injected by `neon deploy`.
 *
 * Postgres  → DATABASE_URL (already used in lib/db/index.ts)
 * Object Storage → AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY,
 *                  AWS_ENDPOINT_URL_S3, AWS_REGION
 * AI Gateway → NEON_AI_GATEWAY_TOKEN, NEON_AI_GATEWAY_BASE_URL
 * Functions  → NEON_FUNCTION_HELLO_BASE_URL
 */

import { S3Client } from "@aws-sdk/client-s3";
import { createNeon } from "@neon/ai-sdk-provider";

// ── Object Storage ────────────────────────────────────────────────────────────

export function getS3Client(): S3Client {
  const endpoint = process.env.AWS_ENDPOINT_URL_S3;
  const region = process.env.AWS_REGION ?? "us-east-1";
  if (!endpoint) throw new Error("AWS_ENDPOINT_URL_S3 is not set — run neon deploy first");
  return new S3Client({
    endpoint,
    region,
    forcePathStyle: true, // required for Neon S3-compatible storage
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });
}

export const ASSETS_BUCKET = "assets";

// ── AI Gateway ────────────────────────────────────────────────────────────────

export function getNeonAI() {
  const baseURL = process.env.NEON_AI_GATEWAY_BASE_URL;
  const apiKey = process.env.NEON_AI_GATEWAY_TOKEN;
  if (!baseURL || !apiKey) {
    throw new Error("NEON_AI_GATEWAY_BASE_URL / NEON_AI_GATEWAY_TOKEN not set — run neon deploy first");
  }
  return createNeon({ baseURL, apiKey });
}

// ── Functions ─────────────────────────────────────────────────────────────────

export function getHelloFunctionUrl(): string {
  const url = process.env.NEON_FUNCTION_HELLO_BASE_URL;
  if (!url) throw new Error("NEON_FUNCTION_HELLO_BASE_URL is not set — run neon deploy first");
  return url;
}

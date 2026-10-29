/**
 * POST /api/neon/upload
 * Uploads a file to Neon Object Storage (S3-compatible).
 * Expects multipart/form-data with a `file` field.
 * Returns { key, url }.
 */
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getS3Client, ASSETS_BUCKET } from "@/lib/neon-services";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const key = `uploads/${randomUUID()}-${file.name}`;
    const s3 = getS3Client();

    await s3.send(
      new PutObjectCommand({
        Bucket: ASSETS_BUCKET,
        Key: key,
        Body: Buffer.from(bytes),
        ContentType: file.type,
      })
    );

    const endpoint = process.env.AWS_ENDPOINT_URL_S3!;
    const url = `${endpoint}/${ASSETS_BUCKET}/${key}`;
    return NextResponse.json({ key, url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

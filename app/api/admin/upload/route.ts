import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { createHash } from "crypto";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const API_KEY = process.env.CLOUDINARY_API_KEY!;
const API_SECRET = process.env.CLOUDINARY_API_SECRET!;

function sign(params: Record<string, string>): string {
  const sorted = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return createHash("sha256").update(sorted + API_SECRET).digest("hex");
}

export async function POST(req: NextRequest) {
  
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const form = await req.formData();
  const file = form.get("file") as File | null;
  const folder = (form.get("folder") as string) || "emj-consulting";

  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const timestamp = String(Math.round(Date.now() / 1000));
  const params = { folder, timestamp };
  const signature = sign(params);

  const body = new FormData();
  body.append("file", file);
  body.append("api_key", API_KEY);
  body.append("timestamp", timestamp);
  body.append("signature", signature);
  body.append("folder", folder);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body }
  );

  if (!res.ok) {
    const err = await res.json();
    return NextResponse.json({ error: err.error?.message ?? "Upload failed" }, { status: 500 });
  }

  const data = await res.json();
  return NextResponse.json({ url: data.secure_url, public_id: data.public_id });
}

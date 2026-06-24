import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  const file = path.join(process.cwd(), "data", "pages.json");
  return NextResponse.json(JSON.parse(readFileSync(file, "utf-8")));
}

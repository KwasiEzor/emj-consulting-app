import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { services } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await db.select().from(services);
  return NextResponse.json(rows);
}

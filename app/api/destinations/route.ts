import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { destinations } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await db.select().from(destinations);
  return NextResponse.json(rows);
}

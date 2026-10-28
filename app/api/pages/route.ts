import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { pageContent } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await db.select().from(pageContent).where(eq(pageContent.id, 1));
  return NextResponse.json(rows[0]?.data ?? {});
}

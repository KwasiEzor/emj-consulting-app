import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import type { BlogPost } from "@/lib/db/schema";

export async function GET() {
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const rows = await db.select().from(blogPosts);
  return NextResponse.json(rows);
}

export async function PUT(req: NextRequest) {
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const data: BlogPost[] = await req.json();
  await db.delete(blogPosts);
  if (data.length > 0) await db.insert(blogPosts).values(data);
  return NextResponse.json({ success: true });
}

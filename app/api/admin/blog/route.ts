import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { updateDataFile } from "@/lib/github-cms";
import blogData from "@/data/blog.json";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(blogData);
}

export async function PUT(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  const ok = await updateDataFile("blog.json", data);
  return ok
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: "GitHub update failed" }, { status: 500 });
}

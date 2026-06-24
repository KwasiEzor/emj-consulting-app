import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { updateDataFile } from "@/lib/github-cms";
import destinationsData from "@/data/destinations.json";

export async function GET() {
  
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  return NextResponse.json(destinationsData);
}

export async function PUT(req: NextRequest) {
  
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const data = await req.json();
  const ok = await updateDataFile("destinations.json", data);
  return ok
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: "GitHub update failed" }, { status: 500 });
}

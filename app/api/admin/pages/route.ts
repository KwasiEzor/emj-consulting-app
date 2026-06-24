import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { updateDataFile } from "@/lib/github-cms";
import { revalidatePath } from "next/cache";
import { writeFileSync, readFileSync } from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "data", "pages.json");

export async function GET() {
  
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  return NextResponse.json(JSON.parse(readFileSync(FILE, "utf-8")));
}

export async function PUT(req: NextRequest) {
  
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const data = await req.json();

  writeFileSync(FILE, JSON.stringify(data, null, 2));
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/services");
  revalidatePath("/destinations");
  revalidatePath("/contact");

  updateDataFile("pages.json", data);
  return NextResponse.json({ success: true });
}

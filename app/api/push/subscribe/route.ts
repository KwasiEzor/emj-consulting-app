import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { saveSubscription, removeSubscription, type PushSubscriptionData } from "@/lib/push";

export async function POST(req: NextRequest) {
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const sub: PushSubscriptionData = await req.json();
  if (!sub?.endpoint || !sub?.keys?.p256dh || !sub?.keys?.auth) {
    return NextResponse.json({ error: "Invalid subscription" }, { status: 400 });
  }
  saveSubscription(sub);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { endpoint } = await req.json();
  if (endpoint) removeSubscription(endpoint);
  return NextResponse.json({ success: true });
}

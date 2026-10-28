import webpush from "web-push";
import { db } from "./db";
import { pushSubscriptions } from "./db/schema";
import { eq } from "drizzle-orm";

function initVapid() {
  if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
    webpush.setVapidDetails(
      process.env.VAPID_EMAIL || "mailto:info@emj-consulting.fr",
      process.env.VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY
    );
  }
}

export type PushSubscriptionData = {
  endpoint: string;
  keys: { p256dh: string; auth: string };
};

export async function readSubscriptions(): Promise<PushSubscriptionData[]> {
  const rows = await db.select().from(pushSubscriptions);
  return rows.map((r) => ({ endpoint: r.endpoint, keys: r.keys }));
}

export async function saveSubscription(sub: PushSubscriptionData) {
  const id = `push-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  await db
    .insert(pushSubscriptions)
    .values({ id, endpoint: sub.endpoint, keys: sub.keys })
    .onConflictDoUpdate({
      target: pushSubscriptions.endpoint,
      set: { keys: sub.keys },
    });
}

export async function removeSubscription(endpoint: string) {
  await db.delete(pushSubscriptions).where(eq(pushSubscriptions.endpoint, endpoint));
}

export async function sendPushToAll(payload: {
  title: string;
  body: string;
  icon?: string;
  url?: string;
}) {
  initVapid();
  const subs = await readSubscriptions();
  const dead: string[] = [];

  await Promise.allSettled(
    subs.map(async (sub) => {
      try {
        await webpush.sendNotification(sub as webpush.PushSubscription, JSON.stringify(payload));
      } catch (err: unknown) {
        const status = (err as { statusCode?: number }).statusCode;
        if (status === 404 || status === 410) dead.push(sub.endpoint);
      }
    })
  );

  if (dead.length) {
    await Promise.allSettled(dead.map(removeSubscription));
  }
}

import webpush from "web-push";
import { readFileSync, writeFileSync } from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "data", "push-subscriptions.json");

webpush.setVapidDetails(
  process.env.VAPID_EMAIL || "mailto:info@emj-consulting.fr",
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export type PushSubscriptionData = {
  endpoint: string;
  keys: { p256dh: string; auth: string };
};

export function readSubscriptions(): PushSubscriptionData[] {
  try {
    return JSON.parse(readFileSync(FILE, "utf-8"));
  } catch {
    return [];
  }
}

export function saveSubscription(sub: PushSubscriptionData) {
  const subs = readSubscriptions().filter((s) => s.endpoint !== sub.endpoint);
  writeFileSync(FILE, JSON.stringify([...subs, sub], null, 2));
}

export function removeSubscription(endpoint: string) {
  const subs = readSubscriptions().filter((s) => s.endpoint !== endpoint);
  writeFileSync(FILE, JSON.stringify(subs, null, 2));
}

export async function sendPushToAll(payload: { title: string; body: string; icon?: string; url?: string }) {
  const subs = readSubscriptions();
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
    dead.forEach(removeSubscription);
  }
}

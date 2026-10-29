import webpush from "web-push";
import { listSubscriptions, removeSubscription } from "@/lib/db/queries";

webpush.setVapidDetails(
  process.env.VAPID_EMAIL || "mailto:info@emj-consulting.fr",
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function sendPushToAll(payload: { title: string; body: string; icon?: string; url?: string }) {
  const subs = await listSubscriptions();
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
    await Promise.all(dead.map(removeSubscription));
  }
}

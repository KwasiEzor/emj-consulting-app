self.addEventListener("push", (event) => {
  if (!event.data) return;
  let payload;
  try {
    payload = event.data.json();
  } catch {
    payload = { title: "EMJ-Consulting", body: event.data.text() };
  }

  event.waitUntil(
    self.registration.showNotification(payload.title || "EMJ-Consulting", {
      body: payload.body || "",
      icon: payload.icon || "/images/hero/logo-icon.png",
      badge: "/images/hero/logo-icon.png",
      tag: "emj-appointment",
      renotify: true,
      data: { url: payload.url || "/admin/appointments" },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/admin/appointments";
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if (client.url.includes(url) && "focus" in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});

import { auth, clerkClient } from "@clerk/nextjs/server";

export async function requireAdmin() {
  const { userId } = await auth();
  if (!userId) return { userId: null, isAdmin: false };

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const role = (user.publicMetadata as { role?: string })?.role;

  return { userId, isAdmin: role === "admin" };
}

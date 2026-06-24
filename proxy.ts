import { clerkMiddleware, createRouteMatcher, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isSignInRoute = createRouteMatcher(["/admin/sign-in(.*)"]);
const isUnauthorizedRoute = createRouteMatcher(["/admin/unauthorized"]);

export default clerkMiddleware(async (auth, req) => {
  if (!isAdminRoute(req)) return;

  const { userId } = await auth();

  // Already on unauthorized page — only allow if signed in (avoids loop)
  if (isUnauthorizedRoute(req)) {
    if (!userId) return NextResponse.redirect(new URL("/admin/sign-in", req.url));
    return; // let them see the unauthorized page
  }

  // On sign-in page
  if (isSignInRoute(req)) {
    if (!userId) return; // not signed in — show sign-in form
    // Already signed in — check role and redirect appropriately
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const role = (user.publicMetadata as { role?: string })?.role;
    if (role === "admin") return NextResponse.redirect(new URL("/admin", req.url));
    return NextResponse.redirect(new URL("/admin/unauthorized", req.url));
  }

  // All other admin routes
  if (!userId) {
    const signInUrl = new URL("/admin/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const role = (user.publicMetadata as { role?: string })?.role;

  if (role !== "admin") {
    return NextResponse.redirect(new URL("/admin/unauthorized", req.url));
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

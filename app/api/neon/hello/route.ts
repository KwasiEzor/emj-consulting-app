/**
 * GET /api/neon/hello
 * Calls the deployed Neon Function "hello" and proxies its response.
 */
import { NextResponse } from "next/server";
import { getHelloFunctionUrl } from "@/lib/neon-services";

export async function GET() {
  try {
    const baseUrl = getHelloFunctionUrl();
    const res = await fetch(baseUrl, { cache: "no-store" });
    const text = await res.text();
    return NextResponse.json({ message: text, status: res.status });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

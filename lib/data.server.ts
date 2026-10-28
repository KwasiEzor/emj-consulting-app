import { db } from "./db";
import { eq } from "drizzle-orm";
import { pageContent } from "./db/schema";
import type { PageContent } from "./types";

export async function getPageContent(): Promise<PageContent> {
  const rows = await db.select().from(pageContent).where(eq(pageContent.id, 1));
  return rows[0]?.data as PageContent;
}

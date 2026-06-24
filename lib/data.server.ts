import { readFileSync } from "fs";
import path from "path";
import type { PageContent } from "./types";

export function getPageContent(): PageContent {
  const file = path.join(process.cwd(), "data", "pages.json");
  return JSON.parse(readFileSync(file, "utf-8")) as PageContent;
}

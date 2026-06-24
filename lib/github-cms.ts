const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const GITHUB_OWNER = process.env.GITHUB_OWNER!;
const GITHUB_REPO = process.env.GITHUB_REPO!;
const BASE_URL = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents`;

async function getFileSha(path: string): Promise<string | null> {
  const res = await fetch(`${BASE_URL}/${path}`, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.sha;
}

export async function updateDataFile(filename: string, content: unknown): Promise<boolean> {
  const path = `data/${filename}`;
  const sha = await getFileSha(path);
  const body = {
    message: `chore: update ${filename} via admin panel`,
    content: Buffer.from(JSON.stringify(content, null, 2)).toString("base64"),
    ...(sha ? { sha } : {}),
  };

  const res = await fetch(`${BASE_URL}/${path}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return res.ok;
}

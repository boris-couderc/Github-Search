import type { GitHubUser } from "./types";

export async function searchUsers(
  query: string,
  signal: AbortSignal,
): Promise<GitHubUser[]> {
  const url = `https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=30`;
  const response = await fetch(url, { signal });

  if (!response.ok) {
    if (response.status === 403 || response.status === 429) {
      throw new Error("rate-limited");
    }
    throw new Error("error");
  }

  const data = (await response.json()) as { items: GitHubUser[] };
  return data.items;
}

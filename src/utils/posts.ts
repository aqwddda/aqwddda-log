import { getCollection, type CollectionEntry } from "astro:content";
import readingTime from "reading-time";

export type Post = CollectionEntry<"posts">;

export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection("posts", ({ data }) => !data.draft);

  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function getPostUrl(post: Post): string {
  return `/posts/${post.id}/`;
}

export function getReadingTime(post: Post): string {
  return readingTime(post.body ?? "").text;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function slugifyTag(tag: string): string {
  return tag
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\p{Letter}\p{Number}-]/gu, "");
}

export function getTags(posts: Post[]) {
  const counts = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([name, count]) => ({ name, count, slug: slugifyTag(name) }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function groupPostsByYear(posts: Post[]) {
  const groups = new Map<number, Post[]>();

  for (const post of posts) {
    const year = post.data.date.getFullYear();
    groups.set(year, [...(groups.get(year) ?? []), post]);
  }

  return [...groups.entries()].sort(([a], [b]) => b - a);
}

export function getPlainText(post: Post): string {
  return (post.body ?? "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_~$|=-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

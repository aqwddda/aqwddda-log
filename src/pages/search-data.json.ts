import type { APIRoute } from "astro";
import { formatDate, getPlainText, getPostUrl, getPosts } from "../utils/posts";

export const prerender = true;

export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const searchData = posts.map((post) => ({
    title: post.data.title,
    description: post.data.description,
    tags: post.data.tags,
    body: getPlainText(post),
    date: formatDate(post.data.date),
    url: getPostUrl(post),
  }));

  return new Response(JSON.stringify(searchData), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};

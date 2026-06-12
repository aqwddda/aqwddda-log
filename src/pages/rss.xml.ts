import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { siteConfig } from "../config";
import { getPostUrl, getPosts } from "../utils/posts";

export const GET: APIRoute = async () => {
  const posts = await getPosts();

  return rss({
    title: siteConfig.name,
    description: siteConfig.description,
    site: siteConfig.url,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: getPostUrl(post),
      categories: post.data.tags,
      author: post.data.author,
    })),
  });
};

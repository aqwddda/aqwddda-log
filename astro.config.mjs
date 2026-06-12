import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import { unified } from "@astrojs/markdown-remark";
import sitemap from "@astrojs/sitemap";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { siteConfig } from "./src/config.ts";

export default defineConfig({
  site: siteConfig.url,
  output: "static",
  integrations: [mdx(), sitemap()],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },
});

# Aqwddda Log

A minimal, content-first technical blog built with Astro, TypeScript, and
Markdown/MDX. It is intended for long-term notes about recommendation systems,
RAG, search, retrieval, and AI engineering.

## Requirements

- Node.js 22.12.0 or newer
- npm 10 or newer

The repository includes `.nvmrc`. If you use nvm:

```bash
nvm use
```

## Local Development

Install dependencies and start the development server:

```bash
npm ci
npm run dev
```

Astro prints the local URL, normally `http://localhost:4321`.

Other useful commands:

```bash
npm run build
npm run preview
npm run check
npm run format:check
npm run verify
```

- `npm run build` generates the static site in `dist/`.
- `npm run preview` serves the production build locally.
- `npm run check` runs Astro and TypeScript diagnostics.
- `npm run format:check` checks formatting without changing files.
- `npm run verify` runs formatting, type, and production build checks.

## Project Structure

```text
src/
  components/        Reusable navigation, post, tag, search, and theme UI
  content/posts/     Markdown and MDX articles
  layouts/           Shared page and article layouts
  pages/             Static routes, search data, and RSS
  styles/            Global light and dark theme styles
  config.ts          Site name, URL, author, navigation, and GitHub links
  content.config.ts  Post frontmatter schema
```

Repository-level formatting rules live in `.editorconfig`, `.gitattributes`,
and `.prettierrc.mjs`. GitHub Actions runs the same release checks on pushes
and pull requests to `main`.

## Add A Post

Create a `.md` or `.mdx` file under `src/content/posts`. The filename becomes
the public slug.

```md
---
title: "Post title"
date: 2026-06-11
description: "A short summary used in lists and metadata."
tags:
  - RAG
  - AI Engineering
author: Aqwddda
draft: false
---

Write the article here.
```

Supported frontmatter:

- `title`: required string
- `date`: required date
- `description`: required string
- `tags`: array of strings, defaults to an empty array
- `author`: required string
- `draft`: boolean, defaults to `false`

Draft posts are excluded from production pages, search data, RSS, and sitemap
output. Run `npm run verify` before publishing.

Markdown and MDX support syntax-highlighted code blocks and math:

```md
Inline math: $a^2 + b^2 = c^2$

$$
\operatorname{score}(q, d) = q \cdot d
$$
```

## Change Site Information

Edit `src/config.ts` to change:

- site name and description
- canonical site URL
- author name
- personal GitHub profile URL
- project repository URL
- navigation items

The Astro configuration, page metadata, RSS feed, and sitemap all derive their
site URL from this configuration.

## Push To GitHub

The public repository is:

[github.com/aqwddda/aqwddda-log](https://github.com/aqwddda/aqwddda-log)

For later changes:

```bash
git add .
git commit -m "Describe the change"
git push
```

## Deploy To Vercel

1. Push the project to GitHub.
2. In Vercel, choose **Add New Project** and import `aqwddda-log`.
3. Vercel should detect Astro automatically.
4. Use `npm run build` as the build command and `dist` as the output directory
   if Vercel does not fill them automatically.
5. Set the Node.js version to 22.x or newer.
6. Deploy the project.

No environment variables, database, server adapter, or serverless functions
are required. A `vercel.json` file is not needed for the static deployment.

The initial canonical URL is:

```text
https://aqwddda-log.vercel.app
```

If Vercel assigns a different project URL, update `src/config.ts` before the
final production deployment.

## Add A Custom Domain

1. Open the Vercel project and go to **Settings > Domains**.
2. Add the domain or subdomain.
3. Apply the DNS records shown by Vercel at your DNS provider.
4. Wait for Vercel to verify the records and issue HTTPS.
5. Replace `siteConfig.url` in `src/config.ts` with the final `https://` URL.
6. Rebuild and redeploy so canonical links, Open Graph metadata, RSS, and the
   sitemap use the custom domain.

## Publishing Checklist

```bash
npm ci
npm run verify
npm run preview
```

Check the new article, its tag pages, search results, `/rss.xml`, and
`/sitemap-index.xml` before pushing.

## License

The project is available under the [MIT License](LICENSE).

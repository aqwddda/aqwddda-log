# Aqwddda Log

网站地址：[https://aqwddda-log.vercel.app](https://aqwddda-log.vercel.app)

GitHub：[https://github.com/aqwddda/aqwddda-log](https://github.com/aqwddda/aqwddda-log)

Aqwddda Log 是一个使用 Astro、TypeScript 和 Markdown/MDX 构建的静态技术博客，用于长期记录推荐系统、RAG 和 AI Engineering 实践。

## Tech Stack

- Astro 6
- TypeScript
- Markdown / MDX
- Vercel
- GitHub Actions

## Local Development

环境要求：

- Node.js 22.12.0+
- npm 10+

安装依赖并启动开发服务器：

```bash
npm ci
npm run dev
```

默认访问地址为 `http://localhost:4321`。

常用命令：

```bash
npm run dev           # 启动开发服务器
npm run build         # 构建静态网站到 dist/
npm run preview       # 预览生产构建
npm run check         # 运行 Astro 和 TypeScript 检查
npm run format:check  # 检查代码格式
npm run verify        # 运行完整发布检查
```

## Project Structure

```text
src/
  components/        通用 UI 组件
  content/posts/     Markdown 和 MDX 文章
  layouts/           页面与文章 Layout
  pages/             页面 Routes、Search Data 和 RSS
  styles/            Global Styles 与主题
  config.ts          Site Config
  content.config.ts  Content Collection Schema
```

## Writing

在 `src/content/posts` 中创建 `.md` 或 `.mdx` 文件。文件名会成为文章 URL 的 slug。

```md
---
title: "文章标题"
date: 2026-06-12
description: "用于文章列表和 metadata 的简短摘要。"
tags:
  - RAG
  - AI Engineering
author: Aqwddda
draft: false
---

在这里编写文章正文。
```

Frontmatter 字段：

- `title`：文章标题
- `date`：发布日期
- `description`：文章摘要
- `tags`：标签数组
- `author`：作者
- `draft`：是否为草稿，默认为 `false`

Draft 不会进入生产页面、Search Index、RSS 或 sitemap。

Markdown 和 MDX 支持代码高亮与数学公式：

```md
行内公式：$a^2 + b^2 = c^2$

$$
\operatorname{score}(q, d) = q \cdot d
$$
```

## Site Configuration

网站信息集中在 `src/config.ts`：

- Site Name 与 Description
- Canonical URL
- Author
- GitHub Profile 与 Repository URL
- Navigation

修改正式域名时，只需更新 `siteConfig.url`。页面 metadata、Open Graph、RSS 和 sitemap 会自动使用新的 URL。

## Deployment

项目部署在 Vercel，并由 GitHub `main` 分支自动触发 Production Deployment。

Vercel 配置：

```text
Framework Preset: Astro
Production Branch: main
Node.js Version: 22.x
Build Command: npm run build
Output Directory: dist
Environment Variables: None
```

项目为纯静态输出，不需要 Database、Server Adapter 或 Serverless Functions。

绑定 Custom Domain 后，需要同步更新 `src/config.ts` 中的 `siteConfig.url`，再提交到 `main` 触发重新部署。

## Release Check

```bash
npm ci
npm run verify
npm run preview
```

发布前检查文章页面、Tags、Search、`/rss.xml` 和 `/sitemap-index.xml`。

## License

[MIT License](LICENSE)

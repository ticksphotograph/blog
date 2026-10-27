---
title: 你好，世界
published: 2026-10-27
description: 这个博客的第一篇文章，顺便说说它为什么长得还不错。
tags: [随笔, 建站]
category: 随笔
image: "./covers/start.png"
draft: false
---

这是这个博客的第一篇文章。

选 **Fuwari** 做主题，理由很朴素：它好看，而且不用为"好看"付出太多代价。基于 Astro 构建，默认零 JavaScript 上屏，页面切换由 swup 做无刷新过渡，深浅色模式、文章目录、全文搜索都是自带的能力。

## 它自带什么

- 深浅色主题 + 可调主题色，访客自己挑喜欢的色相
- 首页卡片流，支持封面图、标签、分类、置顶
- 文章右侧浮动目录，滚动时自动高亮
- 基于 Pagefind 的全文搜索，纯静态、无需后端
- 代码高亮用 Expressive Code，支持行号、折叠、复制
- RSS、Sitemap 自动生成
- 评论支持 giscus / twikoo，配置几行就够

## 写一篇文章只要三步

1. 在 `src/content/posts/` 下新建一个 `.md` 文件
2. 填好开头的 frontmatter
3. `git push`，GitHub Actions 自动构建并发布

frontmatter 长这样：

```yaml
---
title: 文章标题
published: 2026-10-27
description: 一句话摘要，会显示在卡片和搜索结果里
tags: [标签一, 标签二]
category: 分类
draft: false
---
```

把 `draft` 改成 `true`，这篇文章就不会被发布，适合写到一半先存着。

## 关于"够不够快"

构建产物是纯静态的 HTML，没有数据库、没有服务端。部署在 GitHub Pages 上是免费的，配合 Cloudflare 或 Vercel 还能让国内访问稳一些。

> 博客的价值从来不在主题有多花哨，而在于你真的会写第二篇。

那就从这一篇开始。

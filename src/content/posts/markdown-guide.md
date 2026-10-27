---
title: Markdown 能力速查
published: 2026-10-26
description: 表格、代码块、提示框、公式、GitHub 卡片——这个主题支持的写法都在这里。
tags: [Markdown, 写作]
category: 指南
image: "./covers/guide.png"
draft: false
---

写博客大部分时间都在写 Markdown，所以先把这块摸清楚，后面写作会比较顺。

## 基础排版

支持 **加粗**、*斜体*、~~删除线~~、`行内代码`，以及[链接](https://astro.build)。

有序列表：

1. 先想清楚要写什么
2. 再决定写多长
3. 最后才开始写

无序列表：

- 少用形容词
- 多给例子
- 一段只说一件事

## 表格

| 主题 | 框架 | 特点 | 上手难度 |
| --- | --- | --- | --- |
| Fuwari | Astro | 颜值最高，动效细腻 | 中 |
| PaperMod | Hugo | 极简极速，13k star | 低 |
| Butterfly | Hexo | 功能最全，中文文档好 | 低 |
| Chirpy | Jekyll | GitHub Pages 原生支持 | 最低 |

## 代码块

带文件名的代码块：

```ts title="src/config.ts"
export const siteConfig: SiteConfig = {
  title: "我的博客",
  subtitle: "记录技术、阅读与生活",
  lang: "zh_CN",
  themeColor: {
    hue: 250,
    fixed: false,
  },
};
```

终端命令：

```shellsession
$ pnpm install
$ pnpm dev
  ➜  Local:   http://localhost:4321/
```

## 提示框

:::note
普通提示，用来补充一点背景信息。
:::

:::tip
小技巧：按 `Ctrl + K` 可以打开站内搜索。
:::

:::important
重要的事情说一遍就够了，别加粗三遍。
:::

:::caution
谨慎操作，比如删除分支、强制推送。
:::

:::warning
危险操作，做了就回不去了。
:::

## 数学公式

行内公式：当 $a \ne 0$ 时，方程 $ax^2 + bx + c = 0$ 有两个解。

独立公式：

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

## GitHub 仓库卡片

::github{repo="saicaca/fuwari"}

## 引用与分隔线

> 写作是把想清楚的事情写下来，
> 而不是把没想清楚的事情写长。

---

以上基本覆盖了日常会用到的全部语法。剩下的，想到再补。

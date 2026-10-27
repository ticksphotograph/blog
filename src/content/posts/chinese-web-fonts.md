---
title: 中文字体上线前，必须先处理的四件事
published: 2026-10-18
description: 一套中文字体动辄好几 MB，直接丢进网页只会拖垮首屏。聊聊子集化、format、font-display 和回退链。
tags: [前端, 字体, 性能]
category: 前端
image: "./covers/font.png"
draft: false
---

英文站引一个 web font 很轻松，几十 KB 就够。中文不一样——一套完整字库 3~8 MB 是常态。直接 `@font-face` 丢上去，首屏基本就告别"秒开"了。

这篇记一下我在博客上引得意黑（Smiley Sans）时实际处理过的四个问题。

## 一、体积：先压缩，再子集化

原版 TTF 通常很大，先转 `woff2`（同画质下比 woff 再小 20~30%）：

```bash
# 需要 fonttools + brotli
pip install fonttools brotli
fonttools ttLib.woff2 compress smiley-sans.ttf -o smiley-sans.woff2
```

如果只用在标题上，可以做**子集化**，只保留实际用到的字：

```bash
pyftsubset smiley-sans.ttf \
  --text="探索代码的无限可能" \
  --flavor=woff2 \
  --output-file=smiley-sans-subset.woff2
```

我这个博客的标题就几个字，子集化之后从 1.1 MB 直接掉到几 KB。

## 二、@font-face 写全，别偷懒

```css
@font-face {
  font-family: "Smiley Sans";
  src: url("/fonts/smiley-sans.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

几个容易漏的点：

- **`format()` 必写**，否则浏览器可能下载完才发现格式不支持；
- **`font-weight` 要匹配**。只提供 400 却在标题上用 `font-weight: 700`，浏览器会做「伪粗体」，笔画糊在一起，二次元字体尤其明显；
- **`font-display: swap`**：字体没加载完先用回退字体顶上，别让用户对着空白等。

## 三、预加载关键词体

只对**确定会在首屏用到**的字体预加载，别把所有字体都加上：

```html
<link
  rel="preload"
  href="/fonts/smiley-sans.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

`crossorigin` 忘了写会导致字体被下载两次。

## 四、回退链要覆盖全平台

```css
font-family:
  "Smiley Sans", "PingFang SC", "Microsoft YaHei", sans-serif;
```

顺序按「理想字体 → 苹果系统字体 → Windows 系统字体 → 兜底」来排，任何一个平台都不会落回到丑陋的默认衬线体。

## 检查一下效果

改完跑一次 Lighthouse，重点看两个指标：

- **LCP**：字体加载不影响首屏文字渲染
- **CLS**：`swap` 会带来字体替换的位移，可以用 `size-adjust` 或预留行高缓解

> 字体是网页里最容易被忽略、也最容易毁掉体验的资源。

花半小时处理，比之后反复调优划算得多。

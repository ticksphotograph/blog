---
title: 用 Astro 重写博客之后，我想通了几件事
published: 2026-10-25
description: 从动态博客迁到静态站，真正变好的不是加载速度，而是我终于愿意动笔了。
tags: [前端, Astro, 静态站点]
category: 前端
image: "./covers/astro.png"
draft: false
---

之前那版博客是拿现成的动态程序搭的：要装数据库、要备份、要打补丁。每次想写点什么，脑子里先冒出来的不是"写什么"，而是"服务器好像还没续费"。

换成 Astro 之后，这个心理负担消失了。

## 静态站不是倒退，是减负

Astro 的思路很直接：默认把一切都编译成 HTML，只有你明确标记需要交互的组件，才会带 JavaScript 上屏。

对我这种"内容以文字为主"的博客来说，效果立竿见影——首页没有一大堆运行时，切页靠 swup 做无刷新过渡，代码高亮在构建期就生成好了。

不需要的东西，就不发到浏览器里。

## 内容用 Markdown，目录就是索引

文章就是 `src/content/posts/` 下面的 `.md` 文件：

```
src/content/posts/
├── hello-world.md
├── astro-static-blog.md
└── ...
```

开头一段 frontmatter 写明标题、日期、分类、标签：

```yaml
---
title: 用 Astro 重写博客之后，我想通了几件事
published: 2026-10-25
description: 一句话摘要，会显示在列表和搜索结果里
tags: [前端, Astro, 静态站点]
category: 前端
draft: false
---
```

好处是：**文章不和数据库绑定**。换主题、换生成器，文件拷走就行；想批量改，脚本直接扫目录。

## 部署变成了"推一下"

配好 GitHub Actions 之后，发布流程只剩一条 `git push`：

1. 写完文章，保存
2. `git add . && git commit -m "新文章"`
3. `git push`

Actions 自动安装依赖、构建、发布到 GitHub Pages，两分钟左右在线。没有 FTP、没有面板、没有"上传失败重试一下"。

## 真正的变化

速度确实更快了，但这不是重点。

重点是我开始把"写一篇"当成一件低门槛的事——新建文件、敲字、推送。少了那些前置步骤，写作这件事才回到它本身。

> 工具的意义，是让你忘了工具。

如果现在这套还在劝退你，那它可能还不够简单。

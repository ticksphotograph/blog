# 使用说明

这是一个基于 [Fuwari](https://github.com/saicaca/fuwari)（Astro）的个人博客，已配好 GitHub Pages 自动部署。

## 本地预览

```shellsession
$ pnpm install
$ pnpm dev
```

打开 http://localhost:4321/ 。改代码会热更新。

## 上线前必须改的三处

### 1. `src/config.ts` —— 站点信息

| 字段 | 改成 |
| --- | --- |
| `siteConfig.title` | 博客名 |
| `siteConfig.subtitle` | 副标题 |
| `siteConfig.themeColor.hue` | 主题色相：红 0 / 青 200 / 蓝紫 250 / 粉 345 |
| `profileConfig.name` | 你的名字 |
| `profileConfig.avatar` | 头像路径，默认 `assets/images/avatar.png`（把同名文件替换掉即可） |
| `navBarConfig` 里的 GitHub 链接 | 你的主页 |
| `profileConfig.links` | 你的社交账号，图标名查 https://icones.js.org/ |

### 2. `astro.config.mjs` —— 站点地址

```js
site: process.env.BLOG_SITE || "https://yourname.github.io",
base: process.env.BLOG_BASE || "/",
```

- 本地预览保持根路径（`base: "/"`），无需改动。
- 部署到 **项目仓库**（仓库名 `blog`）时，由 `.github/workflows/deploy.yml` 自动注入
  `BLOG_BASE=/blog`、`BLOG_SITE=https://yourname.github.io`，构建出的资源路径才会是 `/blog/...`，否则线上样式/图片会 404。
- 若你想把地址写死（不用环境变量），把 `yourname` 换成用户名、`base` 改成 `/blog` 即可。

### 3. `.github/workflows/deploy.yml`

默认不用改。它会在你 push 到 `main` 时自动构建并发布；构建步骤已注入
`BLOG_BASE=/blog` 与 `BLOG_SITE=https://ticksphotograph.github.io`，对应仓库名 `blog`。

## 发布到 GitHub Pages

```shellsession
$ git init
$ git add .
$ git commit -m "init blog"
$ git branch -M main
$ git remote add origin https://github.com/yourname/blog.git
$ git push -u origin main
```

然后去仓库的 **Settings → Pages**，把 **Source** 选为 **GitHub Actions**（不是 Deploy from a branch）。

返回 **Actions** 标签页，等 `Deploy to GitHub Pages` 跑完，访问 `https://yourname.github.io/blog/` 即可。

## 写文章

在 `src/content/posts/` 下新建 `.md`，开头写：

```yaml
---
title: 文章标题
published: 2026-10-27
description: 一句话摘要，显示在卡片和搜索结果里
tags: [标签一, 标签二]
category: 分类
draft: false
---
```

- `draft: true` 的文章不会发布
- 想加封面图，把图放进 `src/content/posts/`，frontmatter 里写 `image: "./cover.jpg"`

## 常用命令

| 命令 | 作用 |
| --- | --- |
| `pnpm dev` | 本地开发预览 |
| `pnpm build` | 构建到 `dist/`（含 Pagefind 全文搜索索引） |
| `pnpm preview` | 预览构建产物 |
| `pnpm new-post` | 交互式新建文章 |

## 国内访问慢怎么办

GitHub Pages 在国内时快时慢。两个不怎么改代码的办法：

1. 在 Cloudflare Pages 里导入同一个仓库，构建命令 `pnpm build`、输出目录 `dist`，绑个自定义域名
2. 买个便宜域名 CNAME 到 `yourname.github.io`，通常比裸域名快一点

## 本地预览

```shellsession
$ pnpm dev
```

访问 http://localhost:4321/ ，改文件会自动刷新。想验证线上产物是否正常，用 `pnpm build && pnpm preview`。

> 本仓库不含 Docker 相关文件，直接用上面的命令即可。若你本地另有一套 Docker 环境，那份配置已被 `.gitignore` 排除，不会上传到 GitHub。

## 用 GitHub Desktop 上传（不用命令行）

1. 下载安装：https://desktop.github.com/
2. 打开后 **File → Add local repository**，选 `D:\appdata\my-blog`
   （这个目录已经是 git 仓库，有首次提交，会自动识别）
3. **File → Options → Accounts** 登录 GitHub（走浏览器授权，不需要 token）
4. 右上角点 **Push origin**
   - 如果报仓库不存在，先去 https://github.com/new 建一个名为 `blog` 的**空**仓库（不要勾 README），再回来点 Push
5. 推完去仓库 **Settings → Pages**，Source 选 **GitHub Actions**

之后每次更新文章：

1. Desktop 左侧会列出改动文件
2. 左下角写一句 summary（比如「新增文章：xxx」）→ 点 **Commit to main**
3. 右上角 **Push origin**，Actions 自动构建发布

`node_modules`（540MB）和 `dist` 已经在 `.gitignore` 里，不会被传上去，首次推送只有 126 个文件。

## 本地 git 的踩坑记录

- 这台机器上 git 只在 WorkBuddy 的便携目录里，已把它加进用户 PATH：`C:\Users\ticks\.workbuddy\binaries\PortableGit\versions\1.3.0\cmd`
- 如果 push 报 `schannel: CRYPT_E_NO_REVOCATION_CHECK`，是 Watt Toolkit（Steam++）的 GitHub 加速在本地做了 HTTPS 中间人。本仓库已用 `git config http.sslVerify false` 绕过（只影响这个仓库）。想恢复：`git config --unset http.sslVerify`，然后在 Watt Toolkit 里关掉加速或安装它的根证书。


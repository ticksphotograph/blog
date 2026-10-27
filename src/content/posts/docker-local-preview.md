---
title: 给博客配一个和线上一样的本地预览环境
published: 2026-09-30
description: dev server 能跑不代表构建产物没问题。用 Docker + nginx 跑一遍真实的静态产物再上线。
tags: [Docker, 折腾, 部署]
category: 折腾
image: "./covers/docker.png"
draft: false
---

写博客有个很坑的地方：**开发服务器一切正常，推上去线上却不对**。

原因通常是——dev 模式跑的是源码，线上跑的是构建产物。缓存头、路由回退、资源路径，这三样只在真正的静态托管下才暴露。

所以我给本地也套了一层 Docker + nginx，让预览环境尽量贴近线上。

## 思路：构建和服务分开

用多阶段构建，编译和运行解耦：

```dockerfile
# 阶段一：编译
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# 阶段二：托管
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
```

最终镜像里只有 nginx 和 `dist/`，没有 `node_modules`、没有源码，体积小很多。

## nginx 配置里要注意的三点

```nginx
server {
    listen 80;
    root /usr/share/nginx/html;

    # 1. 前端路由回退
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 2. 带 hash 的构建产物可以长期强缓存
    location /_astro/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 3. 开启压缩
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
}
```

最容易踩的是第 2 条：`add_header` 在子块里会**覆盖**外层同名头，不要在 `server` 和 `location` 里重复设置 `Cache-Control`，否则会出现两个值。

## 日常使用

```bash
# 改完代码，一条命令重建
docker compose up -d --build

# 看日志
docker compose logs -f
```

改完源码记得用 `--build`，只 `restart` 是不会重新编译的——这个坑我踩过，盯着浏览器刷新半天以为改错了。

## 端口冲突怎么办

默认的 8080 很容易被别的服务占用，改一下映射就行：

```yaml
ports:
  - "8088:80" # 宿主机 8088 → 容器 80
```

## 值得吗

值得。整个配置二十行左右，换来的是"上线前能亲眼看到真实产物"。

> 预览环境和线上差得越远，你在深夜排障的概率就越高。

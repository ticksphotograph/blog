---
title: 我的命令行工具箱：每天都在用的十来个命令
published: 2026-09-12
description: 不追求花哨配置，只留下真正高频、能省下时间的那几个命令和别名。
tags: [工具, 效率, Shell]
category: 工具
image: "./covers/terminal.png"
draft: false
---

折腾过一堆插件、主题、提示框架之后，我最后留下的东西少得可怜——但每一个都是真的在用。

## 找东西比记住东西重要

```bash
# 按名字找文件
fd "config" 

# 在文件内容里搜
rg "astro.config" 

# 回到最近去过的目录
z blog
```

`fd` 代替 `find`，`rg` 代替 `grep`，`z` 代替一长串 `cd`。这三个是我装完系统第一批要装的。

## 看清楚当前状态

```bash
# 目录树，两层就够
lsd --tree --depth 2

# 实时看文件内容变化
watch -n 1 cat dist/index.html

# 端口被谁占了
lsof -i :8080
```

第三个命令救过我好几次——"启动失败"十有八九是端口被上一个进程占着。

## 几个舍不得删的别名

```bash
alias ll='lsd -lah'
alias gs='git status -sb'
alias gp='git push'
alias dc='docker compose'
alias dcb='docker compose up -d --build'
```

短不是目的，目的是**不用每次都想一遍完整命令**。`dcb` 这种一天敲十几次的，值得占两个字母。

## 批量操作，先预览再执行

改一百个文件的后缀，先打印看看会改什么：

```bash
# 只预览
for f in *.jpeg; do echo "$f -> ${f%.jpeg}.jpg"; done

# 确认无误再加 mv
for f in *.jpeg; do mv "$f" "${f%.jpeg}.jpg"; done
```

这条习惯帮我省下了不止一次误删。

## 不用的东西

- 花里胡哨的终端主题：截图好看，日常碍事
- 巨型 dotfiles 仓库：装的时候很爽，三个月后不敢动
- 所有"一键配置"脚本：出了问题不知道改哪儿

> 工具箱的价值不在数量，在于你闭着眼也能摸到对的那个。

保持它小一点。

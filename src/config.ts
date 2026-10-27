import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "我的博客",
	subtitle: "记录技术、阅读与生活",
	lang: "zh_CN", // 语言代码，中文用 'zh_CN'
	themeColor: {
		hue: 250, // 主题色相 0-360：红 0、青 200、蓝紫 250、粉 345。访客也可以自己调
		fixed: false, // 设为 true 则隐藏访客的主题色选择器
	},
	banner: {
		enable: false, // 想加首页大图时改成 true，并把图放到 assets/images/banner.png
		src: "assets/images/banner.png", // 相对 /src 目录；以 / 开头则相对 /public 目录
		position: "center", // 等价于 object-position，支持 top / center / bottom
		credit: {
			enable: false,
			text: "",
			url: "",
		},
	},
	toc: {
		enable: true, // 文章右侧显示目录
		depth: 2, // 目录最大标题层级 1-3
	},
	favicon: [],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		{
			name: "GitHub",
			url: "https://github.com/ticksphotograph", // 改成你自己的主页
			external: true,
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/avatar.png", // 相对 /src 目录
	name: "你的名字",
	bio: "写代码，也写字。在这里记录技术与生活。",
	links: [
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/ticksphotograph",
		},
		{
			name: "X",
			icon: "fa6-brands:x-twitter",
			url: "https://x.com/yourname",
		},
		{
			name: "Email",
			icon: "fa6-solid:envelope",
			url: "mailto:you@example.com",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// 代码块主题，只支持深色背景
	theme: "github-dark",
};

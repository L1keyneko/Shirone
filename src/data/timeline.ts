/**
 * 大事记时间线数据源
 * 用于 /timeline/ 页面展示
 */

export interface TimelineLink {
	label: string;
	url: string;
	icon?: string;
}

export interface TimelineItem {
	enable?: boolean;
	title: string;
	date: string;
	category?: string;
	subtitle?: string;
	location?: string;
	description?: string;
	highlights?: string[];
	tags?: string[];
	links?: TimelineLink[];
	icon?: string;
	featured?: boolean;
}

export const timelineData: TimelineItem[] = [
  {
    title: "网站迁移至 Astro 框架",
    date: "2026.9",
    category: "site",
    subtitle: "站点迁移",
    location: "lyrikp.art",
    description: "网站框架从 Hexo 迁移至 Astro，对站点整体进行了修缮。",
    highlights: [
      "框架迁移至 Astro",
      "迁移主题至 Shirone",
    ],
    tags: ["Astro", "Shirone", "网站迁移"],
    links: [
      { label: "主题源码", url: "https://github.com/LyraVoid/Shirone", icon: "ri:github-fill" },
    ],
    icon: "lucide:app-window-mac",
    featured: false,
  },
  {
    title: "Zed工具：自定义文件比较",
    date: "2026.9",
    category: "project",
    subtitle: "天，你能想象一个现代差异对比工具只能对比同工作区的文件还没法交换位置吗？",
    description: "Zed 编辑器无法实现不同工作区中的文件差异对比，编写了一个小工具完成这个需求。",
    tags: ["Zed", "Rust"],
    links: [{ label: "zed-diff", url: "https://github.com/L1keyneko/zed-diff", icon: "ri:github-fill" }],
    icon: "ri:tools-fill",
    featured: false,
  },
  {
    title: "Zed插件：ini(3dmigoto)语法高亮",
    date: "2026.8",
    category: "project",
    subtitle: "你没有那我就只能自己写了，这就是开源精神",
    description: "因为 Zed 编辑器中没有 ini-3dmigoto 语法增强的高亮，就参考别的开源工程实现了一个插件。",
    tags: ["Zed", "Rust"],
    links: [{ label: "zed-ini-3dmigoto", url: "https://github.com/L1keyneko/zed-ini-3dmigoto", icon: "ri:github-fill" }],
    icon: "material-symbols:terminal-2-rounded",
    featured: false,
  },
  {
    title: "主题升级",
    date: "2022.6",
    category: "site",
    subtitle: "你快别惦记那主题了，搞点东西出来啊",
    location: "lyrikp.art",
    description: "主题升级至 Volantis6 alpha 版本，参与一些轻量开发。",
    tags: ["Volantis"],
    links: [{ label: "Volantis主题源码", url: "https://github.com/volantis-x/hexo-theme-volantis", icon: "ri:github-fill" }],
    icon: "ri:palette-line",
    featured: false,
  },
  {
    title: "LikeyArrow v1.0",
    date: "2022.4",
    category: "project",
    subtitle: "说真的，就这个你为什么会做一年，而且还没做完",
    description: "LikeyArrow 正式版当前可用。",
    tags: ["LikeyArrow"],
    icon: "material-symbols:highlight-mouse-cursor",
    featured: false,
  },
  {
    title: "云服务商迁移",
    date: "2021.8",
    category: "site",
    subtitle: "所以你只是在享受一个略显痛苦的过程？听起来有点犯罪",
    location: "lyrikp.art",
    description: "阿里云订阅到期，出于成本考虑，转移至腾讯云。\n服务器转移到国内并完成备案，现在访问速度也提升了。",
    highlights: [
      "迁移至腾讯云",
      "ICP与公安备案完成",
      "CDN加速部署"
    ],
    tags: ["腾讯云", "备案", "CDN"],
    icon: "ri:server-line",
    featured: false,
  },
  {
    title: "LikeyArrow 预览版发布",
    date: "2021.7",
    category: "project",
    subtitle: "如果写不了代码，那就先做个设计，蹭一下开源",
    description: "设计并发布名为 LikeyArrow 的光标样式，当前是预览版",
    tags: ["LikeyArrow"],
    icon: "material-symbols:highlight-mouse-cursor",
    featured: false,
  },
  {
    title: "主题变更",
    date: "2021.6",
    category: "site",
    subtitle: "什么事情都没有干光顾着选主题了啊",
    location: "lyrikp.art",
    description: "更换为 Volantis 主题，因为之前改动过底层文件，这次迁移稍稍耗时……要把原先的底层改动也搬过来。",
    highlights: [
      "网站主题变更为 volantis",
    ],
    tags: ["Volantis"],
    links: [{ label: "Volantis主题源码", url: "https://github.com/volantis-x/hexo-theme-volantis", icon: "ri:github-fill" }],
    icon: "ri:palette-line",
    featured: false,
  },
  {
    title: "上线",
    date: "2020.9",
    category: "site",
    subtitle: "事到如今已想不起当时的心情",
    location: "lyrikp.art",
    description: "完成了域名注册与云服务器购买，使用了位于香港的轻量应用服务器，因为它不需要备案。\n网站上线，正式启程。",
    highlights: [
      "域名注册：lyrikp.art",
      "阿里云轻量应用服务器（香港）"
    ],
    tags: ["域名注册", "阿里云"],
    icon: "ri:upload-cloud-2-line",
    featured: false,
  },
  {
    title: "主题变更",
    date: "2020.8",
    category: "site",
    subtitle: "装修中…",
    location: "GitHub Pages",
    description: "技术验证完成，更换为 Fluid 主题。\n一款 Material Design 风格的 Hexo 主题，即便入间我已经不在使用，也真诚地向您推荐。",
    tags: ["Fluid"],
    links: [{ label: "Fluid主题源码", url: "https://github.com/fluid-dev/hexo-theme-fluid", icon: "ri:github-fill" }],
    icon: "ri:palette-line",
    featured: false,
  },
  {
    title: "序章·Prelude",
    date: "2020.8",
    category: "site",
    subtitle: "关于这个网站的开端",
    location: "GitHub Pages",
    description: "站点尝试搭建上线了，使用了 GitHub Pages 提供的免费服务",
    highlights: [
      "Hexo 框架驱动",
    ],
    tags: ["Hexo"],
    // links: [],
    icon: "ri:play-line",
    featured: false,
  },
];

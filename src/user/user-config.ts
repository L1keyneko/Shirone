/**
 * 用户配置覆盖层（由 `pnpm content:sync` 生成，请勿手工编辑）。
 *
 * 内容来自内容仓的以下文件，改配置请改那边：
 * - config/site.yaml
 * - config/permalink.yaml
 * - config/profile.yaml
 * - config/license.yaml
 * - config/expressive-code.yaml
 * - config/announcement.yaml
 * - config/post-list.yaml
 * - config/article.yaml
 * - config/comment.yaml
 * - config/context-menu.yaml
 * - config/fab.yaml
 * - config/sidebar.yaml
 * - config/footer.yaml
 * - config/image-bloom.yaml
 * - config/skills.yaml
 * - config/projects.yaml
 * - config/timeline.yaml
 * - config/devices.yaml
 * - config/music.yaml
 * - config/anime.yaml
 * - config/novel.yaml
 * - config/font.yaml
 * - config/llms.yaml
 * - config/umami.yaml
 * - config/friends.yaml
 * - config/moments.yaml
 * - config/albums.yaml
 * - config/series.yaml
 * - config/nav-bar.yaml
 *
 * 每个领域的类型标注让 `tsc` 直接校验用户配置：拼错的键、越界的枚举、填错的类型
 * 都会在这里报错，错误信息里的行号可以对回上面的 YAML 文件。
 */

import type { AlbumsConfig } from "@/types/albumsConfig";
import type { AnimeConfig } from "@/types/animeConfig";
import type { AnnouncementConfig } from "@/types/announcementConfig";
import type { ArticleConfig } from "@/types/articleConfig";
import type { CommentConfig } from "@/types/commentConfig";
import type { ExpressiveCodeConfig, LicenseConfig, ProfileConfig, SiteConfig } from "@/types/config";
import type { ContextMenuConfig } from "@/types/contextMenuConfig";
import type { DevicesConfig } from "@/types/devicesConfig";
import type { FabConfig } from "@/types/fabConfig";
import type { FontConfig } from "@/types/fontConfig";
import type { FooterConfig } from "@/types/footerConfig";
import type { FriendsConfig } from "@/types/friendsConfig";
import type { ImageBloomConfig } from "@/types/imageBloomConfig";
import type { LlmsConfig } from "@/types/llmsConfig";
import type { MomentsConfig } from "@/types/momentsConfig";
import type { MusicConfig } from "@/types/musicConfig";
import type { NavBarConfigOverride } from "@/types/navBarConfig";
import type { NovelConfig } from "@/types/novelConfig";
import type { PermalinkConfig } from "@/types/permalinkConfig";
import type { PostListConfig } from "@/types/postListConfig";
import type { ProjectsConfig } from "@/types/projectsConfig";
import type { SeriesConfig } from "@/types/seriesConfig";
import type { SidebarConfig } from "@/types/sidebarConfig";
import type { SkillsConfig } from "@/types/skillsConfig";
import type { TimelineConfig } from "@/types/timelineConfig";
import type { UmamiConfig } from "@/types/umamiConfig";

/**
 * 用户只需要写想改的键，因此每个领域都按「深度可选」校验。
 *
 * 数组保持原类型不放宽：清单类配置（侧栏 widget、社交链接）的覆盖语义是整体替换，
 * 半个元素没有意义，而且保留完整类型才能让判别联合的 `type` 字段继续生效。
 */
type DeepPartial<T> = T extends readonly unknown[]
	? T
	: T extends object
		? { [K in keyof T]?: DeepPartial<T[K]> }
		: T;

// config/site.yaml
const site: DeepPartial<SiteConfig> = {
	site: "https://lyrikp.art/",
	base: "/",
	title: "Lyrikp.art",
	subtitle: "故事就从夏天开始吧，因为现在正好是夏天呢",
	lang: "zh_CN",
	timeZone: "Asia/Shanghai",
	topAppBar: {
		contentAlign: "center",
	},
	displaySettings: {
		colorStyle: true,
		colorSpec: true,
		wallpaperMode: true,
		layoutMode: true,
		reduceMotion: true,
		texture: true,
	},
	themeColor: {
		hue: 20,
		fixed: true,
		style: "tonalSpot",
		spec: "2025",
	},
	wallpaperMode: {
		defaultMode: "banner",
	},
	texture: {
		enable: false,
		defaultPreset: "starlight",
		defaultOpacity: 0.12,
		allowMotion: true,
	},
	banner: {
		src: {
			desktop: [
				"https://site.lyrikp.art/layout/background/ClayBubble.PNG",
			],
			mobile: [
				"https://site.lyrikp.art/layout/background/ClayBubble.PNG",
			],
		},
		position: "center",
		dim: {
			enable: true,
			opacity: 0.24,
		},
		homeText: {
			enable: true,
			title: "To Create a World",
			subtitle: [
				"故事就从夏天开始吧，因为现在正好是夏天呢",
				"所以我打开街边窗户来感受世界的温度，窗外的夏日喧嚣吵嚷填满了道路",
				"无法实现者是为理想，触不可及者称之为梦",
				"我从未宣告过夏天结束，因此这场夏日无始无终",
			],
			typewriter: {
				enable: true,
				speed: 100,
				deleteSpeed: 50,
				pauseTime: 2000,
				loop: true,
			},
		},
		carousel: {
			enable: true,
			interval: 6000,
			fadeDuration: 1200,
			animation: "ken-burns",
		},
		waves: {
			enable: true,
		},
	},
	imageOptimization: {
		noReferrerDomains: [
			"*.hdslb.com",
		],
	},
	toc: {
		enable: true,
		depth: 2,
	},
	progressIndicator: {
		style: "dual",
	},
	favicon: [
		{
			src: "https://site.lyrikp.art/Likey/Likeyico.ico",
			theme: "light",
		},
		{
			src: "https://site.lyrikp.art/Likey/Likeyico.ico",
			theme: "dark",
		},
	],
};

// config/permalink.yaml
const permalink: DeepPartial<PermalinkConfig> = {
	enable: false,
	format: "%category%/%raw_postname%",
};

// config/profile.yaml
const profile: DeepPartial<ProfileConfig> = {
	avatar: "https://site.lyrikp.art/Likey/Likey_avatar.png",
	name: "L1key",
	bio: "改变些什么，除了自己",
	links: [
		{
			name: "bilibili",
			icon: "ri:bilibili-fill",
			url: "https://space.bilibili.com/6741287",
		},
		{
			name: "网易云音乐",
			icon: "ri:netease-cloud-music-fill",
			url: "https://music.163.com/#/artist/12466942/?userid=258634496",
		},
		{
			name: "GitHub",
			icon: "ri:github-fill",
			url: "https://github.com/L1keyneko/",
		},
		{
			name: "mail",
			icon: "ri:mail-send-fill",
			url: "mailto:liulike74@163.com",
		},
	],
};

// config/license.yaml
const license: DeepPartial<LicenseConfig> = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

// config/expressive-code.yaml
const expressiveCode: DeepPartial<ExpressiveCodeConfig> = {
	theme: "ayu-light",
	lightTheme: "ayu-light",
	darkTheme: "github-dark",
};

// config/announcement.yaml
const announcement: DeepPartial<AnnouncementConfig> = {
	title: "网站迁移中…",
	content: "迁移工作进行中，有些不正常的界面是正常的 ₍ ˄ ·͈ ༝ ·͈ ˄ * ₎ ◞  ̑̑ ",
	closable: true,
	link: {
		enable: true,
		text: "GitHub",
		url: "https://github.com",
		external: true,
	},
};

// config/post-list.yaml
const postList: DeepPartial<PostListConfig> = {
	pageSize: 7,
	layout: {
		mode: "list",
		cover: "right",
		cardWidth: "regular",
	},
};

// config/article.yaml
const article: DeepPartial<ArticleConfig> = {
	lastUpdated: {
		enable: false,
		minimumAgeDays: 90,
	},
	discovery: {
		enable: false,
		related: {
			enable: false,
			count: 3,
		},
		random: {
			enable: false,
			count: 2,
		},
	},
	share: {
		enable: true,
		includeCover: true,
	},
};

// config/comment.yaml
const comment: DeepPartial<CommentConfig> = {
	enable: false,
	provider: "none",
	lazy: true,
	twikoo: {
		envId: "",
		scriptUrl: "https://cdn.jsdelivr.net/npm/twikoo@1.7.20/dist/twikoo.min.js",
		lang: "auto",
		placeholder: "Share your thoughts...",
	},
	giscus: {
		repo: "",
		repoId: "",
		category: "Announcements",
		categoryId: "",
		mapping: "pathname",
		strict: false,
		reactionsEnabled: true,
		emitMetadata: false,
		inputPosition: "bottom",
		theme: {
			light: "light",
			dark: "dark",
		},
		lang: "auto",
		scriptUrl: "https://giscus.app/client.js",
	},
};

// config/context-menu.yaml
const contextMenu: DeepPartial<ContextMenuConfig> = {
	enable: true,
	actions: [
		"copySelection",
		"backToTop",
		"sharePageLink",
	],
};

// config/fab.yaml
const fab: DeepPartial<FabConfig> = {
	enable: true,
	align: "end",
	size: "regular",
	offset: {
		bottom: "var(--m3e-space-8)",
		right: "var(--m3e-space-6)",
	},
	items: [
		{
			type: "top",
			enable: true,
			devices: [
				"mobile",
				"tablet",
				"desktop",
			],
		},
		{
			type: "toc",
			enable: true,
			devices: [
				"mobile",
				"tablet",
			],
			pages: [
				"post",
			],
			depth: 3,
			closeOnSelect: true,
		},
		{
			type: "comment",
			enable: true,
			devices: [
				"mobile",
				"tablet",
			],
			pages: [
				"post",
			],
		},
		{
			type: "home",
			enable: true,
			devices: [
				"mobile",
				"tablet",
			],
			onlySubPages: true,
		},
	],
};

// config/sidebar.yaml
const sidebar: DeepPartial<SidebarConfig> = {
	enable: true,
	arrangement: "dual",
	side: "left",
	components: [
		{
			type: "profile",
			enable: true,
			slot: "top",
			pages: [
				"home",
			],
		},
		{
			type: "music",
			enable: true,
			slot: "top",
		},
		{
			type: "announcement",
			enable: true,
			slot: "top",
			pages: [
				"home",
			],
		},
		{
			type: "categories",
			enable: true,
			slot: "sticky",
			collapseAfter: 5,
		},
		{
			type: "tags",
			enable: true,
			slot: "sticky",
			collapseAfter: 6,
		},
		{
			type: "stats",
			enable: true,
			slot: "top",
			column: "secondary",
			pages: [
				"home",
				"archive",
				"categories",
				"tags",
			],
		},
		{
			type: "calendar",
			enable: true,
			slot: "top",
			column: "secondary",
			pages: [
				"timeline",
				"archive",
			],
		},
		{
			type: "toc",
			enable: true,
			slot: "sticky",
			column: "secondary",
			pages: [
				"post",
			],
		},
	],
};

// config/footer.yaml
const footer: DeepPartial<FooterConfig> = {
	enable: true,
};

// config/image-bloom.yaml
const imageBloom: DeepPartial<ImageBloomConfig> = {
	enable: true,
	blurRadius: 20,
	opacity: 0.7,
	transitionDuration: 300,
};

// config/skills.yaml
const skills: DeepPartial<SkillsConfig> = {
	enable: true,
	categories: [
		{
			key: "code",
			label: "Code",
			icon: "lucide:square-terminal",
		},
	],
	description: "现在这里是L1keyneko.skill，唯一的问题是AI读取之后可能会降低智能水平。",
};

// config/projects.yaml
const projects: DeepPartial<ProjectsConfig> = {
	enable: true,
	categories: [
		{
			key: "theme",
			label: "主题",
			icon: "material-symbols:palette-outline-rounded",
		},
		{
			key: "app",
			label: "应用",
			icon: "material-symbols:apps-rounded",
		},
		{
			key: "tool",
			label: "工具",
			icon: "material-symbols:build-outline-rounded",
		},
	],
	description: "正在重复重复制造轮子的过程，但似乎有时候这个过程才是目的。",
};

// config/timeline.yaml
const timeline: DeepPartial<TimelineConfig> = {
	enable: true,
	categories: [
		{
			key: "site",
			label: "维护开发",
			icon: "lucide:square-mouse-pointer",
		},
		{
			key: "project",
			label: "开源项目",
			icon: "material-symbols:code-rounded",
		},
		{
			key: "game",
			label: "游戏",
			icon: "material-symbols:gamepad-circle-left",
		},
		{
			key: "music",
			label: "音乐发布",
			icon: "material-symbols:library-music-outline",
		},
	],
	order: "desc",
	description: "点击筛选甚至可以筛选到项目的更新日志！（这日志有够简略的）",
};

// config/devices.yaml
const devices: DeepPartial<DevicesConfig> = {
	enable: false,
	categories: [
		{
			key: "desk",
			label: "桌面工作站",
			icon: "material-symbols:desktop-windows-outline-rounded",
			description: "生产力与开发主力工作台",
		},
		{
			key: "mobile",
			label: "移动便携",
			icon: "material-symbols:phone-iphone",
			description: "随身电子设备与便携数码",
		},
		{
			key: "audio",
			label: "影音音频",
			icon: "material-symbols:headphones-rounded",
			description: "耳机、音响与音频器材",
		},
		{
			key: "peripheral",
			label: "外设配件",
			icon: "material-symbols:keyboard-outline-rounded",
			description: "键盘、鼠标与桌面配件",
		},
	],
};

// config/music.yaml
const music: DeepPartial<MusicConfig> = {
	enable: true,
	provider: "mixed",
	defaultVolume: 0.7,
	defaultMode: "sequence",
	meting: {
		server: "netease",
		type: "playlist",
		id: "7227967012",
	},
};

// config/anime.yaml
const anime: DeepPartial<AnimeConfig> = {
	enable: false,
	source: {
		kind: "local",
		fetchOnDev: true,
	},
	fallback: {
		kind: "local",
	},
	providers: {
		bangumi: {
			enable: false,
			userId: "",
			request: {
				pageSize: 30,
				maxItems: 300,
				minDelayMs: 300,
			},
		},
		bilibili: {
			enable: false,
			vmid: "",
			sessdataEnv: "BILI_SESSDATA",
			cover: {
				mode: "local",
				mirror: "",
				useWebp: true,
			},
			request: {
				pageSize: 30,
				maxItems: 300,
				minDelayMs: 300,
			},
		},
	},
	snapshot: {
		directory: "src/data/anime-snapshots",
		staleAfterDays: 30,
		keepLastValid: true,
	},
};

// config/novel.yaml
const novel: DeepPartial<NovelConfig> = {
	enable: true,
};

// config/font.yaml
const font: DeepPartial<FontConfig> = {
	mode: "custom",
	fontFamilies: [
		{
			id: "hywenhei-body",
			family: "HYWenHei",
			role: "body",
			source: "local",
			variants: [
				{
					file: "src/assets/fonts/HYWenHei-45W.ttf",
					weight: 400,
					style: "normal",
				},
			],
			fallback: [
				"ui-sans-serif",
				"system-ui",
				"sans-serif",
			],
			display: "swap",
			preload: false,
		},
		{
			id: "yozai-cjk",
			family: "Yozai Medium",
			role: "cjk",
			source: "local",
			variants: [
				{
					file: "src/assets/fonts/Yozai-Medium.ttf",
					weight: 500,
					style: "normal",
				},
			],
			fallback: [
				"system-ui",
				"sans-serif",
			],
			display: "swap",
			preload: false,
		},
		{
			id: "maple",
			family: "Maple Mono",
			role: "mono",
			source: "local",
			variants: [
				{
					file: "src/assets/fonts/MapleMono-Regular.ttf",
					weight: 400,
					style: "normal",
				},
			],
			fallback: [
				"ui-monospace",
				"monospace",
			],
			display: "swap",
			preload: false,
		},
	],
};

// config/llms.yaml
const llms: DeepPartial<LlmsConfig> = {
	enable: true,
	generateFull: false,
};

// config/umami.yaml
const umami: DeepPartial<UmamiConfig> = {
	enable: false,
	shareUrl: "",
};

// config/friends.yaml
const friends: DeepPartial<FriendsConfig> = {
	description: "ฅ",
};

// config/moments.yaml
const moments: DeepPartial<MomentsConfig> = {
	description: "梨可可今天在做什么",
};

// config/albums.yaml
const albums: DeepPartial<AlbumsConfig> = {
	title: "视觉存档",
	description: "还在装修中…",
};

// config/series.yaml
const series: DeepPartial<SeriesConfig> = {
	enable: true,
	description: "",
	cardPosition: "top",
};

// config/nav-bar.yaml
const navBar: NavBarConfigOverride = {
	links: [
		{
			name: "Lyrikp",
			icon: "lucide:keyboard-music",
			children: [
				{
					preset: "Moments",
				},
				{
					preset: "Albums",
				},
			],
		},
		{
			name: "L1keyneko",
			icon: "lucide:code-xml",
			children: [
				{
					preset: "Projects",
				},
				{
					preset: "Skills",
				},
			],
		},
		{
			name: "小说",
			icon: "lucide:library",
			url: "/novel/",
			children: [
				{
					name: "后来你牵着我的手",
					url: "/series/then-you-took-my-hand/",
					icon: "lucide:book-heart",
					external: false,
				},
				{
					name: "龙与图书馆Ⅰ",
					url: "/series/dragonlibrary-1-mourn-not-at-morningtide/",
					icon: "ri:quill-pen-line",
					external: false,
				},
			],
		},
		{
			preset: "Timeline",
		},
		{
			name: "Link",
			icon: "ri:send-plane-fill",
			children: [
				{
					preset: "Friends",
				},
				{
					preset: "Compass",
				},
			],
		},
		{
			name: "",
			icon: "ri:more-fill",
			children: [
				{
					preset: "Series",
				},
				{
					preset: "Archive",
				},
				{
					preset: "Categories",
				},
				{
					preset: "Tags",
				},
			],
		},
	],
};

/** 领域名 -> 该领域的用户覆盖值（仅包含用户显式声明的键）。 */
export const userConfigOverrides: Readonly<Record<string, unknown>> = {
	site,
	permalink,
	profile,
	license,
	expressiveCode,
	announcement,
	postList,
	article,
	comment,
	contextMenu,
	fab,
	sidebar,
	footer,
	imageBloom,
	skills,
	projects,
	timeline,
	devices,
	music,
	anime,
	novel,
	font,
	llms,
	umami,
	friends,
	moments,
	albums,
	series,
	navBar,
};

/** 本次生成消费了内容仓中的哪些文件，用于溯源与错误提示。 */
export const userConfigSources: readonly string[] = [
	"config/site.yaml",
	"config/permalink.yaml",
	"config/profile.yaml",
	"config/license.yaml",
	"config/expressive-code.yaml",
	"config/announcement.yaml",
	"config/post-list.yaml",
	"config/article.yaml",
	"config/comment.yaml",
	"config/context-menu.yaml",
	"config/fab.yaml",
	"config/sidebar.yaml",
	"config/footer.yaml",
	"config/image-bloom.yaml",
	"config/skills.yaml",
	"config/projects.yaml",
	"config/timeline.yaml",
	"config/devices.yaml",
	"config/music.yaml",
	"config/anime.yaml",
	"config/novel.yaml",
	"config/font.yaml",
	"config/llms.yaml",
	"config/umami.yaml",
	"config/friends.yaml",
	"config/moments.yaml",
	"config/albums.yaml",
	"config/series.yaml",
	"config/nav-bar.yaml",
];

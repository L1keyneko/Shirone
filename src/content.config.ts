import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const postsCollection = defineCollection({
	loader: glob({ base: "./src/content/posts", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string(),
		published: z.date(),
		publishedAt: z.date().optional(),
		updated: z.date().optional(),
		updatedAt: z.date().optional(),
		pinned: z.boolean().optional().default(false),
		draft: z.boolean().optional().default(false),
		comment: z.boolean().optional().default(true),
		/** 正文首行缩进两格（中文排版习惯，`text-indent: 2em`）；只作用于顶层自然段 */
		textIndent: z.boolean().optional().default(false),
		description: z.string().optional().default(""),
		image: z.string().optional().default(""),
		tags: z.array(z.string()).optional().default([]),
		category: z.string().optional().nullable().default(""),
		/** 所属系列 slug（空 = 不属于任何系列；单归属；落库前统一 trim） */
		series: z
			.string()
			.optional()
			.default("")
			.transform((value) => value.trim()),
		/** 系列内顺序；缺省回退为按发布日期排 */
		seriesOrder: z.number().int().optional(),
		lang: z.string().optional().default(""),

		/* Post Encryption */
		encrypted: z.boolean().optional().default(false),
		password: z
			.union([z.string(), z.number()])
			.transform((v) => String(v))
			.optional(),
		passwordHint: z.string().optional().default(""),
		hideHomeContent: z.boolean().optional().default(true),

		/* Post alias & custom permalink */
		alias: z.string().optional(),
		permalink: z.string().optional(),

		/* For internal use */
		prevUrl: z.string().optional(),
		nextUrl: z.string().optional(),
		prevTitle: z.string().default(""),
		prevSlug: z.string().default(""),
		nextTitle: z.string().default(""),
		nextSlug: z.string().default(""),
	}),
});

const specCollection = defineCollection({
	loader: glob({ base: "./src/content/spec", pattern: "**/*.{md,mdx}" }),
	schema: z.object({}),
});

/**
 * 系列实体集合：每篇 = 一个系列。body 是可选总览，未写则系列页仅列文章。
 * defaultCategory 是回退值（显式 category 优先），解析见 utils/series-utils.ts。
 */
const seriesCollection = defineCollection({
	loader: glob({ base: "./src/content/series", pattern: "**/*.md" }),
	schema: z.object({
		title: z.string(),
		/**
		 * 系列状态（前端 pill 与详情页副标题文案）：
		 * ongoing 连载中 / completed 已完结 / progressing 进行中 / released 已发布
		 */
		status: z
			.enum(["ongoing", "completed", "progressing", "released"])
			.optional()
			.default("ongoing"),
		defaultCategory: z.string().optional().default(""),
		/** 系列图标（Iconify 名，如 material-symbols:rocket-launch-rounded）；留空回退主题默认图标 */
		icon: z.string().optional().default(""),
		/**
		 * 系列详情页副标题模板（可选）：支持 `{count}` 文章数量引用
		 * 留空则沿用默认文案「状态 · N 篇文章」
		 */
		subtitle: z.string().optional().default(""),
	}),
});

const momentsCollection = defineCollection({
	loader: glob({ base: "./src/content/moments", pattern: "**/*.md" }),
	schema: z.object({
		published: z.date(),
		pinned: z.boolean().optional().default(false),
		/** 本条动态的发布人名称；留空回退 `config/profile.yaml` 的 name */
		author: z.string().optional().default(""),
		/** 本条动态的头像（远端 URL、`/public` 路径或 `src/assets` 本地图）；留空回退 profile.yaml 的 avatar */
		authorAvatar: z.string().optional().default(""),
		/** 名称下方的一行小签名；留空不渲染 */
		statusMessage: z.string().optional().default(""),
		location: z.string().optional().default(""),
		/** Mood icon (Iconify name, e.g. `material-symbols:sentiment-excited-outline-rounded`). */
		mood: z.string().optional().default(""),
		tags: z.array(z.string()).optional().default([]),
		images: z
			.array(
				z.object({
					src: z.string(),
					alt: z.string().optional().default(""),
				}),
			)
			.optional()
			.default([]),
		draft: z.boolean().optional().default(false),
	}),
});

export const collections = {
	posts: postsCollection,
	spec: specCollection,
	series: seriesCollection,
	moments: momentsCollection,
} as const;

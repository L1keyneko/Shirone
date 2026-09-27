import type { CollectionEntry } from "astro:content";

export type SeriesEntity = CollectionEntry<"series">;

/**
 * 系列 slug 的唯一规范化点：schema 落在 `post.data.series` 上的是 trim 后的值，
 * 组件/工具再做比较时也走这里，避免「卡片显示正常但计数/分类回退失效」。
 * 另：系列实体必须平铺在 `content/series/` 根下，slug 即单个路由段，
 * 不使用 `a/b` 形式的嵌套目录。
 */
export function normaliseSeriesSlug(raw: string | null | undefined): string {
	return (raw ?? "").trim();
}

/** 系列未配置 icon 时的回退图标：索引页与详情页页头用实心变体。 */
export const SERIES_FALLBACK_ICON = "material-symbols:auto-stories-rounded";

/** 文章内系列卡的回退图标：沿用描边变体（保持既有视觉）。 */
export const SERIES_FALLBACK_ICON_OUTLINE =
	"material-symbols:auto-stories-outline-rounded";

/**
 * 系列 icon 的唯一解析点：空白值回退到主题默认图标。
 * @param icon 系列 frontmatter 的 icon（可为空或缺省）
 * @param variant `filled` = 索引页/详情页页头；`outline` = 文章内系列卡
 */
export function resolveSeriesIcon(
	icon: string | null | undefined,
	variant: "filled" | "outline" = "filled",
): string {
	const trimmed = (icon ?? "").trim();
	if (trimmed) return trimmed;
	return variant === "outline"
		? SERIES_FALLBACK_ICON_OUTLINE
		: SERIES_FALLBACK_ICON;
}

/**
 * 系列「计数文案」的唯一解析点（详情页副标题与索引页卡片 meta 共用）。
 * frontmatter 的 `subtitle` 作为模板，仅 `{count}`（系列内篇数）会被替换；
 * 留空（含仅空白）时回退到默认文案「N 篇文章」。状态不参与模板——
 * 详情页由调用方拼成「状态 · {计数文案}」，索引页卡片只显示计数文案。
 * @param template 系列 frontmatter 的 subtitle（可为空或缺省）
 * @param values.count 系列内文章数
 * @param values.countLabel 已本地化的计数单位（如「篇文章」）
 */
export function resolveSeriesSubtitle(
	template: string | null | undefined,
	values: { count: number; countLabel: string },
): string {
	const trimmed = (template ?? "").trim();
	if (!trimmed) {
		return `${values.count} ${values.countLabel}`;
	}
	return trimmed.replaceAll("{count}", String(values.count));
}

export interface SeriesPostRef {
	slug: string;
	title: string;
}

/**
 * 系列状态（必须与 content.config.ts 的 series schema 枚举保持一致）。
 * 状态 → 展示词条的映射在 `@utils/series-status`：本模块会被 `node --test`
 * 直接导入，不能引入含运行时 `enum` 的模块（见 docs/ci-and-node-tests.md）。
 */
export type SeriesStatus = "ongoing" | "completed" | "progressing" | "released";

export interface SeriesContext {
	/** 系列 slug（集合条目 id） */
	slug: string;
	title: string;
	status: SeriesStatus;
	defaultCategory: string;
	/** 系列图标（frontmatter 原值；空白 = 未配置，展示层用 resolveSeriesIcon 回退） */
	icon: string;
	/** 系列内文章，按阅读顺序 */
	posts: SeriesPostRef[];
	total: number;
}

export interface SeriesPostContext extends SeriesContext {
	/** 当前文章在系列中的 1-based 位置 */
	index: number;
	prev: SeriesPostRef | null;
	next: SeriesPostRef | null;
}

/**
 * 从系列总览 Markdown 提取纯文本摘要（供系列索引页大卡片展示）。
 * 只做轻量清洗：去代码块/图片/标题标记/列表符号/强调符/HTML，
 * 链接保留锚文本；按词边界截断并追加省略号。
 */
export function excerptFromMarkdown(markdown: string, maxChars = 160): string {
	const text = markdown
		.replace(/```[\s\S]*?```/g, " ")
		.replace(/`([^`]*)`/g, "$1")
		.replace(/!\[[^\]]*\]\([^)]*\)/g, "")
		.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
		.replace(/^\s{0,3}#{1,6}\s+/gm, "")
		.replace(/^\s{0,3}>+\s?/gm, "")
		.replace(/^\s*[-*+]\s+/gm, "")
		.replace(/^\s*\d+\.\s+/gm, "")
		.replace(/[*_~]{1,3}([^*_~]+)[*_~]{1,3}/g, "$1")
		.replace(/<[^>]+>/g, "")
		.replace(/\s+/g, " ")
		.trim();

	if (text.length <= maxChars) return text;
	const cut = text.slice(0, maxChars);
	const lastSpace = cut.lastIndexOf(" ");
	return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

export interface UnknownSeriesReference {
	/** 被引用但目录里不存在的系列 slug */
	slug: string;
	/** 第一个引用它的文章 slug（用于报错定位） */
	postSlug: string;
}

/**
 * 收集「文章引用了目录中不存在的系列」的引用（每个未知 slug 取首篇）。
 * 纯函数：调用方（数据层）决定如何提示；行为上这些引用会被静默忽略。
 */
export function findUnknownSeriesSlugs(
	posts: readonly { slug: string; series?: string }[],
	catalog: ReadonlyMap<string, unknown>,
): UnknownSeriesReference[] {
	const firstSeen = new Map<string, string>();
	for (const post of posts) {
		const seriesSlug = normaliseSeriesSlug(post.series);
		if (!seriesSlug || catalog.has(seriesSlug)) continue;
		if (!firstSeen.has(seriesSlug)) {
			firstSeen.set(seriesSlug, post.slug);
		}
	}
	return [...firstSeen.entries()].map(([slug, postSlug]) => ({
		slug,
		postSlug,
	}));
}

export interface SeriesMemberInput {
	slug: string;
	title: string;
	published: Date;
	/** 所属系列 slug（空 = 不属于任何系列） */
	series?: string;
	seriesOrder?: number;
}

/**
 * 系列内阅读顺序：显式 `seriesOrder` 优先；缺省回退为按发布日期升序。
 * 部分标注时，未标注的按日期排在已标注之后，保证确定性。
 */
export function orderSeriesMembers<T extends SeriesMemberInput>(
	members: readonly T[],
): T[] {
	return [...members].sort((a, b) => {
		const aOrder = typeof a.seriesOrder === "number" ? a.seriesOrder : null;
		const bOrder = typeof b.seriesOrder === "number" ? b.seriesOrder : null;
		if (aOrder !== null && bOrder !== null && aOrder !== bOrder) {
			return aOrder - bOrder;
		}
		if (aOrder !== null && bOrder === null) return -1;
		if (aOrder === null && bOrder !== null) return 1;
		const dateDiff = a.published.getTime() - b.published.getTime();
		return dateDiff !== 0 ? dateDiff : a.slug.localeCompare(b.slug);
	});
}

/**
 * 有效 category 的唯一解析点（回退链，非强制）：
 * 显式 post.category → series.defaultCategory → ""（未分类）。
 */
export function resolveSeriesPostCategory(
	category: string | null | undefined,
	seriesData: { defaultCategory?: string } | undefined,
): string {
	const explicit = (category ?? "").trim();
	if (explicit) return explicit;
	return (seriesData?.defaultCategory ?? "").trim();
}

export interface BuildSeriesContextsOptions {
	catalog: Map<string, SeriesEntity>;
	posts: readonly SeriesMemberInput[];
}

/**
 * 为每篇文章构建系列上下文（阅读顺序、index/total、组内上一篇/下一篇）。
 * 没有系列、或引用了目录中不存在的系列的文章 → 不生成上下文（不产生死链）。
 */
export function buildSeriesContexts(
	options: BuildSeriesContextsOptions,
): Map<string, SeriesPostContext> {
	const { catalog, posts } = options;

	const groups = new Map<string, SeriesMemberInput[]>();
	for (const post of posts) {
		const seriesSlug = normaliseSeriesSlug(post.series);
		if (!seriesSlug || !catalog.has(seriesSlug)) continue;
		const group = groups.get(seriesSlug) ?? [];
		group.push(post);
		groups.set(seriesSlug, group);
	}

	const contexts = new Map<string, SeriesPostContext>();
	for (const [slug, members] of groups) {
		const entity = catalog.get(slug);
		if (!entity) continue;
		const ordered = orderSeriesMembers(members);
		const refs: SeriesPostRef[] = ordered.map((member) => ({
			slug: member.slug,
			title: member.title,
		}));
		ordered.forEach((member, index) => {
			contexts.set(member.slug, {
				slug,
				title: entity.data.title,
				status: entity.data.status,
				defaultCategory: entity.data.defaultCategory,
				icon: (entity.data.icon ?? "").trim(),
				posts: refs,
				total: refs.length,
				index: index + 1,
				prev: index > 0 ? refs[index - 1] : null,
				next: index < refs.length - 1 ? refs[index + 1] : null,
			});
		});
	}

	return contexts;
}

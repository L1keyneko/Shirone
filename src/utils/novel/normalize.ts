import type { NovelItem, NovelStatus } from "../../data/novel.ts";

const NOVEL_STATUSES: readonly NovelStatus[] = [
	"ongoing",
	"completed",
	"released",
];

/** 文本字段：去空白，空串归一为 undefined */
function clean(value: unknown): string | undefined {
	if (typeof value !== "string") return undefined;
	const trimmed = value.trim();
	return trimmed === "" ? undefined : trimmed;
}

/** 进度百分比：夹在 0-100 并保留一位小数；非有限数字（含字符串）一律丢弃 */
function cleanProgress(value: unknown): number | undefined {
	if (typeof value !== "number" || !Number.isFinite(value)) return undefined;
	return Math.min(100, Math.max(0, Math.round(value * 10) / 10));
}

/** 状态：非法或缺失时回退 `ongoing`（连载中） */
function cleanStatus(value: unknown): NovelStatus {
	return NOVEL_STATUSES.includes(value as NovelStatus)
		? (value as NovelStatus)
		: "ongoing";
}

/**
 * 单条小说数据归一化：覆盖手写数据常见笔误（缺标题、状态拼错、进度越界、标签含空白），
 * 不发起任何外部请求，也不改写 `cover` 地址——封面直连配置里填写的 url。
 * 返回 `null` 表示该条目应被丢弃（缺标题）。
 */
export function normalizeNovelItem(
	raw: Partial<NovelItem> | undefined | null,
): NovelItem | null {
	if (!raw) return null;

	const title = clean(raw.title);
	if (!title) return null;

	const tags = Array.isArray(raw.tags)
		? Array.from(
				new Set(
					raw.tags
						.map((tag) => clean(tag))
						.filter((tag): tag is string => tag !== undefined),
				),
			)
		: [];

	const cover = clean(raw.cover);
	const link = clean(raw.link);
	const description = clean(raw.description);
	const year = clean(raw.year);
	const author = clean(raw.author);
	const progress = cleanProgress(raw.progress);

	return {
		title,
		status: cleanStatus(raw.status),
		tags,
		...(cover ? { cover } : {}),
		...(link ? { link } : {}),
		...(progress !== undefined ? { progress } : {}),
		...(description ? { description } : {}),
		...(year ? { year } : {}),
		...(author ? { author } : {}),
	};
}

/** 列表归一化：逐条清洗并丢弃无效项，保持原始顺序 */
export function normalizeNovelList(
	raw: readonly (Partial<NovelItem> | undefined | null)[],
): NovelItem[] {
	return raw
		.map(normalizeNovelItem)
		.filter((item): item is NovelItem => item !== null);
}

import type { NovelStatus } from "../../data/novel.ts";
import I18nKey from "../../i18n/i18nKey.ts";

/** 状态展示顺序：筛选 chips 固定按此顺序列出全部三种状态 */
export const NOVEL_STATUS_ORDER: readonly NovelStatus[] = [
	"ongoing",
	"completed",
	"released",
];

/**
 * 状态呈现元数据：筛选 chip 与卡片 pill 共用的 i18n 键与 M3E 语义色。
 * - `icon`：仅用于筛选 chip 的前置图标（选中时由 Chips 原子替换为对钩）；
 * - `color`：卡片状态 pill 的语义色圆点与文字色。
 */
export const NOVEL_STATUS_META: Record<
	NovelStatus,
	{ key: I18nKey; icon: string; color: string }
> = {
	ongoing: {
		key: I18nKey.novelStatusOngoing,
		icon: "ri:quill-pen-fill",
		color: "var(--primary)",
	},
	completed: {
		key: I18nKey.novelStatusCompleted,
		icon: "ri:book-2-line",
		color: "var(--tertiary)",
	},
	released: {
		key: I18nKey.novelStatusReleased,
		icon: "material-symbols:publish-rounded",
		color: "var(--secondary)",
	},
};

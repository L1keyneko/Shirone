/**
 * 小说本地数据源
 * 用于小说展示页：/novel/
 *
 * 说明：封面请直接填写图片 url（站内 /public 路径或远端链接均可），
 * 主题不做本地快照、健康检查与降级回退；进度按百分比直接填写（0-100）。
 */

/** 作品状态：连载中 / 已完结 / 已发行 */
export type NovelStatus = "ongoing" | "completed" | "released";

export interface NovelItem {
	title: string;
	cover?: string;
	link?: string;
	status: NovelStatus;
	/** 创作进度：百分比数字（0-100） */
	progress?: number;
	description?: string;
	year?: string;
	/** 作者 */
	author?: string;
	/** 题材标签（用于筛选） */
	tags: string[];
}

export const novelData: NovelItem[] = [
	{
		title: "后来你牵着我的手",
		status: "ongoing",
    link: "/series/then-you-took-my-hand/",
    description: "因为这是后来的事情，所以现在的现在也充满了期待。",
    progress: 1,
		year: "2017",
		author: "L1key",
		tags: ["同人", "百合"],
	},
	{
		title: "龙与图书馆·请别于阳光中哀伤",
		status: "ongoing",
		link: "/series/dragonlibrary-1-mourn-not-at-morningtide/",
    description: "「我想要拯救所有人，至少拯救你。」",
    progress: 0.1,
		// year: "2018",
		author: "L1key",
		tags: ["奇幻"],
	},
];

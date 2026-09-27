import { novelData } from "../data/novel.ts";
import type { NovelItem } from "../data/novel.ts";
import { normalizeNovelList } from "./novel/normalize.ts";

/**
 * 小说页数据入口（构建期同步取数，零外部请求）。
 *
 * 数据即内容仓 `data/novel.ts`（构建期同步到 `src/data/novel.ts`），此处只做一次
 * 归一化清洗：不读取快照、不请求外部 API、不做封面的本地化存储与降级回退。
 */
export function getNovelList(): NovelItem[] {
	return normalizeNovelList(novelData);
}

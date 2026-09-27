import type { PageMeta } from "./pageMeta.ts";

/**
 * 小说界面配置契约。
 *
 * 相对番剧域刻意保持极简（无外部数据源平面）：
 * - 不接入任何 provider、不生成快照、没有同步脚本；
 * - 封面直接读取条目里的 `cover` 地址，不做本地快照存储、健康检查与降级回退；
 * - 条目数据维护在内容仓 `data/novel.ts`（构建期同步到 `src/data/novel.ts`）。
 */
export interface NovelConfig extends PageMeta {
	/** 是否启用小说页；false 时导航入口同步隐藏，访问 /novel/ 跳转 404 */
	enable: boolean;
}

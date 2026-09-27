import type { NovelConfig } from "../types/novelConfig.ts";
import { withUserConfig } from "../utils/config-overlay.ts";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  Shirone 小说页面配置
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 小说属于「按需额外添加」的功能：主题默认关闭、不提供示例数据，也不进入默认导航。
 * 启用方式：内容仓 `config/novel.yaml` 写 `enable: true`，在 `data/novel.ts` 维护条目；
 * 想在导航里展示时，在 `config/nav-bar.yaml` 写 `- preset: Novel` 即可。
 *
 * 相对番剧页刻意保持极简：不接入外部数据源、不生成快照、没有同步脚本。
 * - 条目数据维护在内容仓 `data/novel.ts`（构建期同步到 `src/data/novel.ts`）；
 * - 封面直接使用条目里填写的 `cover` 地址，不做本地化存储、健康检查与降级回退；
 * - 状态取 `ongoing`（连载中）/ `completed`（已完结）/ `released`（已发行）；
 * - 进度按百分比直接填写（0-100）。
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const novelConfig: NovelConfig = withUserConfig("novel", {
	/** 是否启用小说页（默认关闭，按需在内容仓 `config/novel.yaml` 开启）；false 时导航入口同步隐藏，访问 /novel/ 跳转 404 */
	enable: false,
	title: "$t:novel",
	description: "$t:novelBanner",
});

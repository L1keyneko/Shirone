import I18nKey from "../i18n/i18nKey.ts";
import type { SeriesStatus } from "./series-utils.ts";

/**
 * 系列状态 → 展示词条的唯一映射点（页面与组件消费）。
 *
 * 为什么不放在 `series-utils.ts`：该模块会被 `node --test` 直接导入，而 Node 的
 * strip-only TypeScript 加载器不支持运行时 `enum`（见 `docs/ci-and-node-tests.md`）。
 *
 * 新增状态时：这里补一条、`src/i18n/i18nKey.ts` 补词条，并给全部 10 种语言补值；
 * `Record<SeriesStatus, I18nKey>` 会在漏配时直接编译报错。
 */
export const SERIES_STATUS_I18N_KEYS: Record<SeriesStatus, I18nKey> = {
	ongoing: I18nKey.seriesStatusOngoing,
	completed: I18nKey.seriesStatusCompleted,
	progressing: I18nKey.seriesStatusProgressing,
	released: I18nKey.seriesStatusReleased,
};

import { expect, test } from "@playwright/test";

/**
 * 小说页功能锁定（pages/novel.astro -> organisms/NovelSection.svelte，client:visible）。
 *
 * 与番剧页同构但更简：没有评分、时段、数据源切换与快照告警；进度是百分比；
 * 状态只有 ongoing / completed / released（文案、图标、语义色统一来自
 * utils/novel/status.ts 的 NOVEL_STATUS_META）。
 *
 * 断言刻意保持**内容无关**：不绑定具体作品名与条数，只锁定结构契约、交互语言与
 * 无障碍状态，因此任何数据集（主题示例数据或使用者自己的 data/novel.ts）都能验证。
 */

const STATUS_PATTERN = /^(ongoing|completed|released)$/;

test.describe("小说页", () => {
	test.beforeEach(async ({ page }) => {
		// 卡片级断言跑在确定布局下：预置 grid 偏好
		await page.addInitScript(() =>
			localStorage.setItem("post-list-mode", "grid"),
		);
		await page.goto("/novel/");
		await expect(page.locator(".novel-card").first()).toBeVisible();
	});

	test("渲染页头与作品卡片（结构契约）", async ({ page }) => {
		await expect(page.locator(".page-header")).toHaveCount(1);
		await expect(page.locator(".page-header__title")).not.toBeEmpty();
		await expect(page.locator(".page-header__icon svg")).toHaveCount(1);

		const cards = page.locator(".novel-card");
		expect(await cards.count()).toBeGreaterThan(0);

		const first = cards.first();
		await expect(first).toHaveAttribute("data-status", STATUS_PATTERN);
		await expect(first.locator(".novel-card__title")).not.toBeEmpty();
		// 状态 tonal pill：文案走 i18n（语言无关，只要求非空）
		await expect(first.locator(".novel-card__status")).not.toBeEmpty();
		// 计数文案由 novelCounts 模板渲染（含 {count} 替换）
		await expect(page.locator(".novel-section__count")).toHaveText(/\d/);
	});

	test("进度按百分比呈现，且不再是「已看/总集数」语义", async ({ page }) => {
		const progress = page.locator(".novel-card__progress").first();
		if ((await progress.count()) === 0) {
			// 数据集可以不提供 progress；此时不渲染进度区
			await expect(page.locator(".novel-card__progress-text")).toHaveCount(0);
			return;
		}
		await expect(progress).toHaveAttribute("role", "group");
		await expect(progress).toHaveAttribute("aria-label", /.+/);
		await expect(
			page.locator(".novel-card__progress-text").first(),
		).toHaveText(/^\d{1,3}(\.\d)?%$/);
	});

	test("布局切换（grid / list）与 aria-pressed 同步", async ({ page }) => {
		const layoutSwitch = page.locator(".novel-section__layout-switch");
		await expect(layoutSwitch).toHaveAttribute("role", "group");

		// 第 1 个按钮 = 网格，第 2 个 = 列表（与 anime 页一致，按渲染顺序取，不依赖语言文案）
		const gridBtn = layoutSwitch.locator("button").nth(0);
		const listBtn = layoutSwitch.locator("button").nth(1);

		await listBtn.click();
		await expect(listBtn).toHaveAttribute("aria-pressed", "true");
		await expect(page.locator(".novel-list--list")).toHaveCount(1);

		await gridBtn.click();
		await expect(gridBtn).toHaveAttribute("aria-pressed", "true");
		await expect(page.locator(".novel-list--grid")).toHaveCount(1);
	});

	test("搜索无结果时展示空状态", async ({ page }) => {
		const search = page.locator(".novel-section__search input");
		await search.fill("zzz-not-a-novel-zzz");
		await expect(page.locator(".novel-section__empty")).toBeVisible();
		await expect(page.locator(".novel-card")).toHaveCount(0);
	});

	test("状态筛选 chip 可切换且同步 aria-pressed", async ({ page }) => {
		const chips = page.locator(".novel-section__chips .m3-chip--filter");
		const chipCount = await chips.count();
		test.skip(chipCount === 0, "数据集未包含任何状态，无需筛选");

		const firstChip = chips.first();
		await firstChip.click();
		await expect(firstChip).toHaveAttribute("aria-pressed", "true");
		// 状态切换走「指示器 → 淡出 → 揭幕」三段过渡，等卡片重新可见再操作
		await expect(page.locator(".novel-card").first()).toBeVisible();

		// 再点一次取消筛选，恢复全部
		await firstChip.click();
		await expect(firstChip).toHaveAttribute("aria-pressed", "false");
		await expect(page.locator(".novel-card").first()).toBeVisible();
	});
});

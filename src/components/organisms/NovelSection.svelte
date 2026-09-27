<script lang="ts">
/**
 * 小说页主体（有机体）：页头 + 状态筛选 chips + 实时搜索 + 双布局（grid/list）+ 加载更多。
 * 数据由页面层经 utils/novel-data.getNovelList() 构建期同步取得后以 props 传入；
 * 筛选状态与搜索同步 URL（?status= / ?q=），与番剧/友链/动态页同一交互语言。
 *
 * 与番剧页的刻意差异：小说域没有外部数据源，因此不迁移 provider 徽标、本地/快照切换、
 * 快照过期告警与同步失败提示；进度是百分比（0-100），不出现集数语义。
 *
 * 布局形态：小说页独立偏好（localStorage `shirone:novel-layout-mode`，默认 grid 网格），
 * 不与博客文章列表偏好耦合；工具栏提供快速切换按钮，切类后逐卡 FLIP 平移。
 */
import Button from "@components/atoms/action/Button.svelte";
import Chips from "@components/atoms/action/Chips.svelte";
import Card from "@components/atoms/display/Card.svelte";
import LoadingIndicator from "@components/atoms/feedback/LoadingIndicator.svelte";
import TextField from "@components/atoms/input/TextField.svelte";
import NovelCard from "@components/molecules/NovelCard.svelte";
import PageHeader from "@components/molecules/PageHeader.svelte";
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import Icon from "@iconify/svelte";
import { flipFromRect } from "@utils/motion";
import { NOVEL_STATUS_META, NOVEL_STATUS_ORDER } from "@utils/novel/status";
import { onMount } from "svelte";
import type { NovelItem } from "../../data/novel";

export type NovelLayoutMode = "grid" | "list";

let {
	novels = [] as NovelItem[],
	title = i18n(I18nKey.novel),
	subtitle = i18n(I18nKey.novelBanner),
}: {
	novels?: NovelItem[];
	title?: string;
	subtitle?: string;
} = $props();

const NOVEL_PAGE_SIZE = 12;
const NOVEL_LAYOUT_KEY = "shirone:novel-layout-mode";

let query = $state("");
let selectedStatus = $state("");
let shownCount = $state(NOVEL_PAGE_SIZE);
let initialized = false;
/** 状态筛选过渡三段态：loading 展示指示器 → out 指示器淡出 → idle 列表 stagger 揭幕 */
type FilterPhase = "idle" | "loading" | "out";
let phase = $state<FilterPhase>("idle");
let phaseTimers: ReturnType<typeof setTimeout>[] = [];

/** 布局形态：小说页专属独立偏好，默认书封网格 (grid) */
let listMode = $state<NovelLayoutMode>("grid");
let listEl = $state<HTMLElement | null>(null);

const LIST_MODE_CLASS: Record<NovelLayoutMode, string> = {
	grid: "novel-list--grid",
	list: "novel-list--list",
};

/** 状态筛选 chips：只列数据中实际出现的状态（按 NOVEL_STATUS_ORDER 排序；单选，再点取消 = 全部） */
const statusItems = $derived(
	NOVEL_STATUS_ORDER.filter((status) =>
		novels.some((novel) => novel.status === status),
	).map((status) => ({
		value: status,
		label: i18n(NOVEL_STATUS_META[status].key),
		leadingIcon: NOVEL_STATUS_META[status].icon,
	})),
);

const filtered = $derived.by(() => {
	const normalizedQuery = query.trim().toLowerCase();
	return novels.filter((novel) => {
		if (selectedStatus && novel.status !== selectedStatus) return false;
		if (!normalizedQuery) return true;
		return [
			novel.title,
			novel.description ?? "",
			novel.author ?? "",
			novel.year ?? "",
			...novel.tags,
		].some((val) => val.toLowerCase().includes(normalizedQuery));
	});
});

const visibleNovels = $derived(filtered.slice(0, shownCount));
const hasMore = $derived(filtered.length > shownCount);

/** 结果计数：novelCounts 是带 {count} 占位符的词条，在此替换（见 src/i18n/AGENTS.md） */
function countLabel(count: number) {
	return i18n(I18nKey.novelCounts).replaceAll("{count}", String(count));
}

/** 状态筛选：指示器展示 → 淡出 → 网格 stagger 揭幕 */
function onStatusChange() {
	phaseTimers.forEach(clearTimeout);
	phase = "loading";
	phaseTimers = [
		setTimeout(() => (phase = "out"), 300),
		setTimeout(() => (phase = "idle"), 300 + 150),
	];
}

function readStoredLayoutMode(): NovelLayoutMode {
	try {
		const stored = localStorage.getItem(NOVEL_LAYOUT_KEY);
		if (stored === "list" || stored === "grid") return stored;
	} catch {
		/* Ignore local storage access failure */
	}
	return "grid";
}

/** 切布局：切类前记录卡片位置，下一帧逐卡 FLIP 平移（reduced-motion 跳变） */
function switchLayoutMode(mode: NovelLayoutMode) {
	if (mode === listMode) return;
	const cards = Array.from(
		listEl?.querySelectorAll<HTMLElement>(".novel-card") ?? [],
	);
	const before = cards.map((card) => card.getBoundingClientRect());
	listMode = mode;
	try {
		localStorage.setItem(NOVEL_LAYOUT_KEY, mode);
	} catch {
		/* Ignore local storage access failure */
	}
	requestAnimationFrame(() => {
		cards.forEach((card, index) => flipFromRect(card, before[index], 400));
	});
}

// 筛选/搜索变化时重置已加载数
$effect(() => {
	const s = selectedStatus;
	const q = query;
	if (!initialized) return;
	shownCount = NOVEL_PAGE_SIZE;
});

// 筛选状态与搜索词同步到 URL（?status= / ?q=），刷新/分享/回退保留
$effect(() => {
	const s = selectedStatus;
	const q = query;
	if (!initialized) return;
	const params = new URLSearchParams(window.location.search);
	params.delete("status");
	params.delete("q");
	if (s) params.set("status", s);
	if (q.trim()) params.set("q", q.trim());
	const qs = params.toString();
	history.replaceState(
		history.state,
		"",
		qs ? `?${qs}` : window.location.pathname,
	);
});

onMount(() => {
	const params = new URLSearchParams(window.location.search);
	selectedStatus = params.get("status") || "";
	query = params.get("q") || "";
	listMode = readStoredLayoutMode();
	initialized = true;
	return () => {
		phaseTimers.forEach(clearTimeout);
	};
});
</script>

<Card color="var(--card-bg)" radius="l" class="novel-section px-8 py-6">
	<PageHeader
		icon="material-symbols:auto-stories-rounded"
		{title}
		{subtitle}
	/>

	{#if novels.length > 0}
		<div class="novel-section__tools">
			<div class="novel-section__search-row">
				<div class="novel-section__search">
					<TextField
						type="search"
						bind:value={query}
						placeholder={i18n(I18nKey.search)}
						label={i18n(I18nKey.search)}
						hideLabel
						variant="outlined"
						class="!rounded-(--shape-corner-l)"
					>
						<Icon slot="leading" icon="material-symbols:search-rounded" aria-hidden="true" />
					</TextField>
					{#if query}
						<button
							type="button"
							class="novel-section__search-clear"
							aria-label={i18n(I18nKey.clear)}
							onclick={() => (query = "")}
						>
							<Icon icon="material-symbols:close-rounded" aria-hidden="true" />
						</button>
					{/if}
				</div>

				<div class="novel-section__layout-switch" role="group" aria-label={i18n(I18nKey.layoutMode)}>
					<button
						type="button"
						class="novel-section__layout-btn"
						class:novel-section__layout-btn--active={listMode === "grid"}
						aria-label={i18n(I18nKey.layoutGrid)}
						title={i18n(I18nKey.layoutGrid)}
						aria-pressed={listMode === "grid"}
						onclick={() => switchLayoutMode("grid")}
					>
						<Icon icon="material-symbols:grid-view-rounded" aria-hidden="true" />
					</button>
					<button
						type="button"
						class="novel-section__layout-btn"
						class:novel-section__layout-btn--active={listMode === "list"}
						aria-label={i18n(I18nKey.layoutList)}
						title={i18n(I18nKey.layoutList)}
						aria-pressed={listMode === "list"}
						onclick={() => switchLayoutMode("list")}
					>
						<Icon icon="material-symbols:view-list-rounded" aria-hidden="true" />
					</button>
				</div>
			</div>

			<div class="novel-section__filter-row">
				<div class="novel-section__chips">
					<Chips
						items={statusItems}
						variant="filter"
						bind:value={selectedStatus}
						onchange={onStatusChange}
					/>
				</div>

				{#if filtered.length > 0}
					<p class="novel-section__count" aria-live="polite">{countLabel(filtered.length)}</p>
				{/if}
			</div>
		</div>
	{/if}

	{#if phase !== "idle"}
		<!-- 状态筛选过渡：contained 指示器展示后淡出，再由网格 stagger 揭幕 -->
		<div
			class="novel-section__loading"
			class:novel-section__loading--out={phase === "out"}
		>
			<LoadingIndicator contained size={64} />
		</div>
	{:else if visibleNovels.length > 0}
		{#key `${selectedStatus}|${query}`}
			<div class="novel-list {LIST_MODE_CLASS[listMode]}" bind:this={listEl}>
				{#each visibleNovels as novel, i (novel.title)}
					<NovelCard {novel} delay={Math.min(i, 7) * 45} />
				{/each}
			</div>
		{/key}
		{#if hasMore}
			<div class="novel-section__more">
				<Button
					variant="outlined"
					icon="material-symbols:expand-more-rounded"
					label={i18n(I18nKey.loadMore)}
					onclick={() => (shownCount += NOVEL_PAGE_SIZE)}
				/>
			</div>
		{/if}
	{:else}
		<div class="novel-section__empty">
			{#if novels.length === 0}
				<Icon icon="material-symbols:auto-stories-outline-rounded" aria-hidden="true" />
				<span>{i18n(I18nKey.novelNoResults)}</span>
			{:else}
				<Icon icon="material-symbols:search-off-rounded" aria-hidden="true" />
				<span>{i18n(I18nKey.novelNoResults)}</span>
			{/if}
		</div>
	{/if}
</Card>

<style lang="stylus">
@import "../../styles/breakpoints.styl"

.novel-section
	display: block

	@media (max-width: bp-sm - 1px)
		/* 卡片容器（Card 原子根）移动端收窄内边距 */
		padding: 1rem 0.75rem

		.novel-list--grid, .novel-list--list
			padding-top: 1rem
			gap: 0.625rem

	&__tools
		display: flex
		flex-direction: column
		gap: 0.875rem
		padding-bottom: 1.25rem
		border-bottom: 1px solid var(--outline-variant)

	&__search-row
		display: flex
		align-items: center
		gap: 0.625rem
		width: 100%

	&__search
		position: relative
		flex: 1
		min-width: 0
		max-width: 32rem

		:global(.m3-text-field)
			width: 100%

	&__search-clear
		position: absolute
		right: 0.5rem
		top: 50%
		transform: translateY(-50%)
		display: inline-flex
		flex-shrink: 0
		align-items: center
		justify-content: center
		width: 1.75rem
		height: 1.75rem
		padding: 0.25rem
		border: none
		background: none
		color: var(--on-surface-variant)
		cursor: pointer
		border-radius: var(--shape-corner-full)
		> :global(svg)
			width: 1.25rem
			height: 1.25rem
		&:hover
			background: unquote("color-mix(in oklab, var(--on-surface-variant) 8%, transparent)")

	&__filter-row
		display: flex
		flex-wrap: wrap
		align-items: center
		justify-content: space-between
		gap: 0.75rem
		width: 100%

	&__chips
		flex: 1
		min-width: 0
		overflow-x: auto
		scrollbar-width: none
		&::-webkit-scrollbar
			display: none

	&__count
		margin: 0
		color: var(--on-surface-variant)
		font: var(--m3e-type-body-small)
		white-space: nowrap

	&__layout-switch
		display: inline-flex
		flex-shrink: 0
		align-items: center
		padding: 0.125rem
		border-radius: var(--shape-corner-m)
		background: var(--surface-container-high)
		border: 1px solid var(--outline-variant)

	&__layout-btn
		display: inline-flex
		align-items: center
		justify-content: center
		width: 2.125rem
		height: 2.125rem
		border: none
		border-radius: var(--shape-corner-s)
		background: transparent
		color: var(--on-surface-variant)
		cursor: pointer
		transition:
			background-color var(--m3e-duration-short) var(--m3e-easing-standard),
			color var(--m3e-duration-short) var(--m3e-easing-standard)
		> :global(svg)
			width: 1.25rem
			height: 1.25rem

		&:hover
			color: var(--on-surface)
			background: unquote("color-mix(in oklab, var(--on-surface) 8%, transparent)")

		&--active
			background: var(--primary-container)
			color: var(--on-primary-container)
			&:hover
				background: var(--primary-container)
				color: var(--on-primary-container)

	/* 状态筛选过渡：区块位置的大号 contained LoadingIndicator（out = 淡出退场） */
	&__loading
		display: flex
		align-items: center
		justify-content: center
		min-height: 11rem
		padding-top: 1.5rem

		&--out
			animation: novel-loading-out var(--m3e-duration-short) var(--m3e-easing-emphasized-accelerate) both

	&__more
		display: flex
		justify-content: center
		margin-top: 1.5rem

	&__empty
		display: flex
		flex-direction: column
		align-items: center
		justify-content: center
		gap: 0.875rem
		min-height: 12rem
		padding-top: 1.5rem
		color: var(--on-surface-variant)
		font: var(--m3e-type-body-large)
		> :global(svg)
			width: 2.75rem
			height: 2.75rem
			color: var(--outline)

/* 书封网格（grid）：手机 2 列、平板 3 列、电脑端精准 4 列，紧凑美观 */
.novel-list--grid
	display: grid
	grid-template-columns: repeat(2, 1fr)
	gap: 0.875rem
	padding-top: 1.25rem

	@media (min-width: 32rem)
		grid-template-columns: repeat(3, 1fr)
		gap: 0.875rem

	@media (min-width: bp-md)
		grid-template-columns: repeat(4, 1fr)
		gap: 1rem

/* 横向列表（list）：单列，超宽视口双列；卡片横排（封面固定宽 + 正文铺开）。
   跨组件边界覆盖卡片内部类，统一走 :global（容器级驱动，规则集中在布局拥有方）。 */
.novel-list--list
	display: grid
	grid-template-columns: 1fr
	gap: 1rem
	padding-top: 1.25rem

	@media (min-width: 88rem)
		grid-template-columns: repeat(2, 1fr)

	:global(.novel-card)
		flex-direction: row

	:global(.novel-card__cover)
		width: 8.5rem
		flex-shrink: 0

		@media (min-width: 48rem)
			width: 11rem

	:global(.novel-card__body)
		flex: 1
		min-width: 0
		padding: 1.125rem 1.25rem
		justify-content: space-between

	:global(.novel-card__desc)
		-webkit-line-clamp: 3

/* 指示器退场：淡出 + 轻微收拢（reduced-motion 由全局规则压至终态） */
@keyframes novel-loading-out
	from
		opacity: 1
		transform: none
	to
		opacity: 0
		transform: scale(0.96)
</style>

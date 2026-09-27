<script lang="ts">
/**
 * 小说卡片（分子）：2:3 封面 + 状态 tonal pill + 作者 chip + 创作进度百分比。
 * - cover 省略或加载失败时显示主题色渐变占位（书页水印），补图前不破版；
 * - cover 原样使用数据里填写的 url（站内路径或远端链接），不做快照、镜像前缀与降级回退；
 * - link 存在时整张封面可点（外链），悬停显示打开层；否则封面为纯展示块；
 * - progress 是百分比数字（0-100）：ProgressIndicator（linear determinate）+「{n}%」文本；
 * - 状态文案 / 图标 / 语义色一律取自 NOVEL_STATUS_META，经 inline --novel-status-color
 *   注入（NOVEL_STATUS_META 的 M3E 角色映射），避免动态 class 触发 Svelte unused-CSS
 *   剥离（见 rules/pitfalls.md 1.6）。
 */

import ProgressIndicator from "@components/atoms/feedback/ProgressIndicator.svelte";
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import Icon from "@iconify/svelte";
import { reveal } from "@utils/motion";
import { NOVEL_STATUS_META } from "@utils/novel/status";
import { url } from "@utils/url-utils";
import type { NovelItem } from "../../data/novel";

let {
	novel,
	/** stagger 入场延迟 ms（由列表传入：第 i 项 i × step） */
	delay = 0,
}: { novel: NovelItem; delay?: number } = $props();

/** 封面加载失败标记：只切换视觉占位，不改写数据里的 cover 地址 */
let coverFailed = $state(false);

const statusMeta = $derived(NOVEL_STATUS_META[novel.status]);
/** 进度百分比：数据入口已夹到 0-100 并保留一位小数，这里原样呈现 */
const progressPercent = $derived(novel.progress);
/** 0-1 比例供 ProgressIndicator 使用 */
const progressRatio = $derived(
	progressPercent === undefined
		? 0
		: Math.min(Math.max(progressPercent / 100, 0), 1),
);
/** 进度行可访问名：「进度 42%」 */
const progressLabel = $derived(
	progressPercent === undefined
		? ""
		: `${i18n(I18nKey.novelProgress)} ${progressPercent}%`,
);
/** 元信息行作者部分的可访问名（「作者 L1key」）；年份与作者之间由 CSS 生成「·」分隔 */
const authorLabel = $derived(
	novel.author ? `${i18n(I18nKey.novelAuthor)} ${novel.author}` : "",
);
</script>

<article
	class="novel-card"
	data-status={novel.status}
	style={`--novel-status-color: ${statusMeta.color};`}
	use:reveal={{ delay }}
>
	<!-- 封面内部内容（img/占位 + 打开层）：link/非 link 两分支共享，避免重复维护 -->
	{#snippet coverContent()}
		{#if novel.cover && !coverFailed}
			<img
				class="novel-card__cover-img"
				src={url(novel.cover)}
				alt={novel.title}
				loading="lazy"
				referrerpolicy="no-referrer"
				onerror={() => (coverFailed = true)}
			/>
		{:else}
			<span class="novel-card__placeholder" aria-hidden="true">
				<Icon icon="material-symbols:auto-stories-outline-rounded" />
			</span>
		{/if}
		<span class="novel-card__scrim" aria-hidden="true"></span>
		{#if novel.link}
			<!-- 可点封面：悬停深色 scrim + 打开钮 -->
			<span class="novel-card__open" aria-hidden="true">
				<Icon icon="material-symbols:open-in-new-rounded" />
			</span>
		{/if}
	{/snippet}

	{#if novel.link}
		<a
			class="novel-card__cover"
			href={novel.link}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={novel.title}
		>
			{@render coverContent()}
		</a>
	{:else}
		<div class="novel-card__cover">
			{@render coverContent()}
		</div>
	{/if}

	<div class="novel-card__body">
		<div class="novel-card__header-row">
			<span class="novel-card__status">
				<span class="novel-card__status-dot" aria-hidden="true"></span>
				{i18n(statusMeta.key)}
			</span>
		</div>

		<span class="novel-card__title" title={novel.title}>{novel.title}</span>

		{#if progressPercent !== undefined}
			<div class="novel-card__progress" role="group" aria-label={progressLabel}>
				<span class="novel-card__progress-track">
					<ProgressIndicator progress={progressRatio} label={`${progressPercent}%`} />
				</span>
				<span class="novel-card__progress-text">{progressPercent}%</span>
			</div>
		{/if}

		{#if novel.description}
			<p class="novel-card__desc">{novel.description}</p>
		{/if}

		<!-- 年份 · 作者：两项都可缺省——缺年份时作者直接占据该位置，分隔符由 CSS 在两项之间生成；
		     整行始终渲染（空行也占位），避免缺字段时卡片下半部分跑位 -->
		<!-- 两个 span 之间不能有换行/缩进：模板空白会被渲染成一个真实空格，与 · 叠加后间距过大 -->
		<p class="novel-card__meta">{#if novel.year}<span>{novel.year}</span>{/if}{#if novel.author}<span title={authorLabel}>{novel.author}</span>{/if}</p>

		{#if novel.tags.length > 0}
			<div class="novel-card__tags">
				{#each novel.tags as tag (tag)}
					<span class="novel-card__tag">#{tag}</span>
				{/each}
			</div>
		{/if}
	</div>
</article>

<style lang="stylus">
.novel-card
	position: relative
	display: flex
	flex-direction: column
	box-sizing: border-box
	overflow: hidden
	border-radius: var(--shape-corner-l)
	background: var(--card-bg)
	border: 1px solid var(--outline-variant)
	transition:
		border-color var(--m3e-duration-medium) var(--m3e-easing-emphasized-decelerate),
		box-shadow var(--m3e-duration-medium) var(--m3e-easing-emphasized-decelerate),
		transform var(--m3e-duration-medium) var(--m3e-easing-emphasized-decelerate)
	&:hover
		border-color: var(--outline)
		box-shadow: var(--m3e-elevation-2)
		transform: translateY(-2px)

	/* 2:3 书封：渐变占位同时充当图片加载背景 */
	&__cover
		position: relative
		display: block
		aspect-ratio: 2 / 3
		overflow: hidden
		background: linear-gradient(160deg,
			unquote("color-mix(in oklab, var(--primary) 16%, var(--surface-container-low))"),
			var(--surface-container-high))
		text-decoration: none

	&__cover-img
		display: block
		width: 100%
		height: 100%
		object-fit: cover
		transition: transform var(--m3e-duration-long) var(--m3e-easing-emphasized-decelerate)
		.novel-card:hover &
			transform: scale(1.05)

	/* 封面上下渐变暗影（保证叠层文字/徽标可读性） */
	&__scrim
		position: absolute
		inset: 0
		pointer-events: none
		background: linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, transparent 40%, rgba(0, 0, 0, 0.25) 100%)
		opacity: 0.6
		transition: opacity var(--m3e-duration-medium) var(--m3e-easing-standard)
		.novel-card:hover &
			opacity: 0.8

	/* 悬停打开层：深色 scrim + 圆形打开钮（仅 link 卡片），hover 淡入放大 */
	&__open
		position: absolute
		inset: 0
		display: flex
		align-items: center
		justify-content: center
		background: unquote("color-mix(in srgb, #000 40%, transparent)")
		opacity: 0
		transition:
			opacity var(--m3e-duration-medium) var(--m3e-easing-emphasized-decelerate),
			transform var(--m3e-duration-medium) var(--m3e-easing-emphasized-decelerate)
		transform: scale(0.9)
		> :global(svg)
			width: 2.75rem
			height: 2.75rem
			color: #fff
			filter: drop-shadow(0 0.125rem 0.375rem rgba(0, 0, 0, 0.5))
		.novel-card:hover &
			opacity: 1
			transform: scale(1)

	/* 占位水印：主题色淡渐变 + 书页图标（无封面 / 封面加载失败时） */
	&__placeholder
		position: absolute
		inset: 0
		display: flex
		align-items: center
		justify-content: center
		color: unquote("color-mix(in oklab, var(--on-surface-variant) 40%, transparent)")
		> :global(svg)
			width: 2.5rem
			height: 2.5rem

	&__body
		display: flex
		flex-direction: column
		flex: 1
		min-width: 0
		gap: var(--m3e-space-1)
		padding: var(--m3e-space-3) var(--m3e-space-4) var(--m3e-space-4)

	&__header-row
		display: flex
		align-items: center
		justify-content: space-between
		gap: 0.5rem

	/* 状态 tonal pill：语义色来自 NOVEL_STATUS_META（inline --novel-status-color）；
	   前缀用与番剧页一致的语义色圆点，而不是图标 */
	&__status
		display: inline-flex
		align-items: center
		align-self: flex-start
		gap: 0.3125rem
		padding: 0.125rem 0.5rem
		border-radius: var(--shape-corner-full)
		background: unquote("color-mix(in oklab, var(--novel-status-color) 12%, transparent)")
		color: var(--novel-status-color)
		font: var(--m3e-type-label-small)
		font-weight: 600

	&__status-dot
		width: 0.375rem
		height: 0.375rem
		border-radius: var(--shape-corner-full)
		background: currentColor

	&__title
		margin: 0
		color: var(--on-surface)
		font: var(--m3e-type-title-small)
		font-weight: 600
		line-height: 1.3
		display: -webkit-box
		-webkit-line-clamp: 2
		-webkit-box-orient: vertical
		overflow: hidden
		transition: color var(--m3e-duration-short) var(--m3e-easing-standard)
		.novel-card:hover &
			color: var(--primary)

	&__desc
		margin: 0
		color: var(--on-surface-variant)
		font: var(--m3e-type-body-small)
		line-height: 1.4
		display: -webkit-box
		-webkit-line-clamp: 2
		-webkit-box-orient: vertical
		overflow: hidden

	&__progress
		display: flex
		align-items: center
		gap: 0.5rem
		padding: 0.125rem 0

	&__progress-track
		flex: 1
		min-width: 0

	&__progress-text
		flex-shrink: 0
		color: var(--on-surface-variant)
		font: var(--m3e-type-label-small)
		font-weight: 600
		font-variant-numeric: tabular-nums

	/* 年份·作者：沉底锚点（margin-top auto）；两项都缺时保留空行占位以稳定布局 */
	&__meta
		margin: auto 0 0
		color: var(--on-surface-variant)
		font: var(--m3e-type-body-small)
		white-space: nowrap
		overflow: hidden
		text-overflow: ellipsis

		span + span::before
			content: "·"
			margin: 0 0

	&__tags
		display: flex
		flex-wrap: wrap
		gap: 0.25rem 0.375rem

	&__tag
		color: var(--on-surface-variant)
		font: var(--m3e-type-label-small)
		transition: color var(--m3e-duration-short) var(--m3e-easing-standard)
		&:hover
			color: var(--primary)

:global(html.motion-reduced) .novel-card,
:global(html.motion-reduced) .novel-card__cover-img,
:global(html.motion-reduced) .novel-card__open
	transition: none
	transform: none

@media (prefers-reduced-motion: reduce)
	.novel-card,
	.novel-card__cover-img,
	.novel-card__open
		transition: none
		transform: none
</style>

import assert from "node:assert/strict";
import test from "node:test";
import {
	normalizeNovelItem,
	normalizeNovelList,
} from "../src/utils/novel/normalize.ts";

test("normalizeNovelItem keeps every valid field and the cover url verbatim", () => {
	const item = normalizeNovelItem({
		title: "龙与图书馆",
		cover: "https://cdn.example.com/cover.webp",
		link: "/series/dragonlibrary-1-mourn-not-at-morningtide/",
		status: "completed",
		progress: 100,
		description: "守住藏书塔的最后一位图书管理员",
		year: "2025",
		author: "L1key",
		tags: ["奇幻", "群像"],
	});

	assert.deepEqual(item, {
		title: "龙与图书馆",
		cover: "https://cdn.example.com/cover.webp",
		link: "/series/dragonlibrary-1-mourn-not-at-morningtide/",
		status: "completed",
		progress: 100,
		description: "守住藏书塔的最后一位图书管理员",
		year: "2025",
		author: "L1key",
		tags: ["奇幻", "群像"],
	});
});

test("normalizeNovelItem drops entries without a title", () => {
	assert.equal(normalizeNovelItem({ title: "   " }), null);
	assert.equal(normalizeNovelItem({}), null);
	assert.equal(normalizeNovelItem(null), null);
});

test("normalizeNovelItem falls back to ongoing for unknown or missing status", () => {
	assert.equal(normalizeNovelItem({ title: "A" })?.status, "ongoing");
	assert.equal(
		normalizeNovelItem({ title: "A", status: "finished" })?.status,
		"ongoing",
	);
	assert.equal(
		normalizeNovelItem({ title: "A", status: "released" })?.status,
		"released",
	);
});

test("normalizeNovelItem keeps one decimal and clamps the percentage progress", () => {
	assert.equal(
		normalizeNovelItem({ title: "A", progress: 42.6 })?.progress,
		42.6,
	);
	assert.equal(normalizeNovelItem({ title: "A", progress: 0.1 })?.progress, 0.1);
	assert.equal(
		normalizeNovelItem({ title: "A", progress: 33.33 })?.progress,
		33.3,
	);
	assert.equal(normalizeNovelItem({ title: "A", progress: -5 })?.progress, 0);
	assert.equal(normalizeNovelItem({ title: "A", progress: 120 })?.progress, 100);
});

test("normalizeNovelItem drops non-numeric progress instead of guessing", () => {
	const item = normalizeNovelItem({ title: "A", progress: "42" });
	assert.equal(item?.progress, undefined);
	assert.equal("progress" in (item ?? {}), false);
	assert.equal(
		normalizeNovelItem({ title: "A", progress: Number.NaN })?.progress,
		undefined,
	);
});

test("normalizeNovelItem trims, dedupes and drops blank tags", () => {
	assert.deepEqual(normalizeNovelItem({ title: "A", tags: [" 奇幻 ", "奇幻", "", "  "] })?.tags, [
		"奇幻",
	]);
	assert.deepEqual(normalizeNovelItem({ title: "A" })?.tags, []);
});

test("normalizeNovelItem omits empty optional fields instead of keeping blanks", () => {
	const item = normalizeNovelItem({
		title: "A",
		cover: "  ",
		link: "",
		description: "   ",
		year: "",
		author: "  ",
	});

	assert.deepEqual(item, { title: "A", status: "ongoing", tags: [] });
	assert.equal("cover" in (item ?? {}), false);
	assert.equal("author" in (item ?? {}), false);
});

test("normalizeNovelList keeps the input order and filters invalid entries", () => {
	const list = normalizeNovelList([
		{ title: "第一篇" },
		null,
		{ title: "第二篇", status: "released", progress: 12.4 },
		{ title: "" },
	]);

	assert.deepEqual(
		list.map((item) => item.title),
		["第一篇", "第二篇"],
	);
	assert.equal(list[1].progress, 12.4);
});

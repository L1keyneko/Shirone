import assert from "node:assert/strict";
import test from "node:test";
import { resolveMomentAuthorSource } from "../src/utils/moment-author.ts";

const profile = { name: "L1key", avatar: "https://cdn.example.com/avatar.png" };

test("resolveMomentAuthorSource falls back to the profile for untouched moments", () => {
	assert.deepEqual(resolveMomentAuthorSource(profile, {}), {
		name: "L1key",
		avatar: "https://cdn.example.com/avatar.png",
		usesCustomAvatar: false,
	});
});

test("resolveMomentAuthorSource prefers the frontmatter author name", () => {
	assert.deepEqual(resolveMomentAuthorSource(profile, { author: "Lyrikp" }), {
		name: "Lyrikp",
		avatar: "https://cdn.example.com/avatar.png",
		usesCustomAvatar: false,
	});
});

test("resolveMomentAuthorSource prefers the frontmatter avatar and flags it", () => {
	const resolved = resolveMomentAuthorSource(profile, {
		authorAvatar: "/images/moments/Lyrik.png",
	});
	assert.equal(resolved.avatar, "/images/moments/Lyrik.png");
	assert.equal(resolved.usesCustomAvatar, true);
	assert.equal(resolved.name, "L1key");
});

test("resolveMomentAuthorSource keeps remote avatars verbatim", () => {
	assert.equal(
		resolveMomentAuthorSource(profile, {
			authorAvatar: "https://site.example.com/a/b.png?v=2",
		}).avatar,
		"https://site.example.com/a/b.png?v=2",
	);
});

test("resolveMomentAuthorSource treats blank overrides as absent", () => {
	assert.deepEqual(
		resolveMomentAuthorSource(profile, { author: "   ", authorAvatar: "\t" }),
		{
			name: "L1key",
			avatar: "https://cdn.example.com/avatar.png",
			usesCustomAvatar: false,
		},
	);
});

test("resolveMomentAuthorSource trims values and tolerates an empty profile", () => {
	assert.deepEqual(
		resolveMomentAuthorSource({}, { author: "  Lyrikp  ", authorAvatar: "  " }),
		{ name: "Lyrikp", avatar: "", usesCustomAvatar: false },
	);
	assert.deepEqual(resolveMomentAuthorSource({}, {}), {
		name: "",
		avatar: "",
		usesCustomAvatar: false,
	});
});

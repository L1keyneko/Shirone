/**
 * 单条动态的发布人解析（纯函数，便于单测与在页面层复用）。
 *
 * 规则：frontmatter 的 `author`（名称）与 `authorAvatar`（头像）优先，留空回退站点默认
 * （内容仓 `config/profile.yaml` 的 `name` / `avatar`）。
 * 这里只做「用哪一个地址」的决策；头像的实际取图（本地资源转码为 WebP srcset，
 * 远端 URL / `/public` 路径直连）由页面层的 `resolveImageAsset` + `getImage` 完成。
 */
export interface MomentAuthorSource {
	/** 最终展示名 */
	name: string;
	/** 最终头像地址（远端 URL、`/public` 路径或 `src/assets` 本地图片路径） */
	avatar: string;
	/** 是否用了本条动态自定义的头像（决定页面层是否需要重新解析该图） */
	usesCustomAvatar: boolean;
}

/** 站点默认发布人（来自 `config/profile.yaml`） */
export interface MomentAuthorFallback {
	name?: string;
	avatar?: string;
}

/** 单条动态可能提供的作者覆盖（来自 frontmatter） */
export interface MomentAuthorOverrideInput {
	author?: string;
	authorAvatar?: string;
}

export function resolveMomentAuthorSource(
	fallback: MomentAuthorFallback,
	moment: MomentAuthorOverrideInput,
): MomentAuthorSource {
	const name = (moment.author ?? "").trim();
	const avatar = (moment.authorAvatar ?? "").trim();

	return {
		name: name || (fallback.name ?? "").trim(),
		avatar: avatar || (fallback.avatar ?? "").trim(),
		usesCustomAvatar: avatar !== "",
	};
}

/**
 * 开源项目数据源
 * 用于 /projects/ 页面展示
 */

export type ProjectPhase = "shipped" | "building" | "exploring";

export interface ProjectItem {
	enable?: boolean;
	key: string;
	title: string;
	summary: string;
	category: string;
	phase: ProjectPhase;
	technologies: string[];
	icon?: string;
	cover?: string;
	coverAlt?: string;
	featured?: boolean;
	website?: string;
	repository?: string;
	year?: string;
}

export const projectsData: ProjectItem[] = [
  {
		key: "LikeyArrow",
		title: "cursor-LikeyArrow",
		summary: "一款简约、透明、泛用的隐式可爱替换鼠标ฅ^. .^ฅ",
		category: "Design",
		phase: "building",
		technologies: ["PhotoShop", "CDN"],
		icon: "material-symbols:highlight-mouse-cursor",
		featured: false,
		repository: "https://github.com/L1keyneko/cursor-LikeyArrow",
    website: "../Design/LikeyArrow/",
		cover: "https://site.lyrikp.art/article/design/LikeyArrow/Previewall.png",
		year: "2022",
  },
  {
		key: "zed-ini-3dmigoto",
		title: "zed-ini-3dmigoto",
		summary: "Zed 编辑器的 ini(3DMigoto) 语法支持 | Highlight support for 3DMigoto in Zed",
		category: "Zed",
		phase: "shipped",
		technologies: ["Tree-sitter Query", "Rust"],
		icon: "material-symbols:terminal-2-rounded",
		featured: false,
		repository: "https://github.com/L1keyneko/zed-ini-3dmigoto",
		year: "2026",
  },
  {
		key: "zed-diff",
		title: "zed-diff",
		summary: "让不同工作区文件使用 Zed 进行差异对比的小工具 | Zed diff in different workspace",
		category: "Zed",
		phase: "shipped",
		technologies: ["Rust"],
		icon: "ri:tools-fill",
		featured: false,
		repository: "https://github.com/L1keyneko/zed-diff",
		year: "2026",
	},
];

export function getProjectsList(): ProjectItem[] {
	return projectsData;
}

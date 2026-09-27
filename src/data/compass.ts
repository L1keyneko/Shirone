/**
 * 站点罗盘导航数据源
 * 用于 /compass/ 页面展示
 */

export interface CompassEntry {
	label: string;
	href: string;
	note?: string;
	icon?: string;
	image?: string;
}

export interface CompassShelf {
	key: string;
	name: string;
	icon?: string;
	blurb?: string;
	entries: CompassEntry[];
}

export const compassData: CompassShelf[] = [
	{
		key: "dev",
		name: "Development",
		icon: "material-symbols:code-rounded",
		blurb: "开发用导航",
		entries: [
			{
				label: "GitHub",
				href: "https://github.com",
				note: "开源代码托管平台",
				icon: "ri:github-fill",
			},
			{
				label: "MDN",
				href: "https://developer.mozilla.org",
				note: "现代前端技术标准文档",
				icon: "material-symbols:menu-book-rounded",
			},
		],
  },
  {
    key: "design",
    name: "Design",
    icon: "ri:palette-line",
    blurb: "设计用参考",
    entries: [
      {
        label: "Icônes",
        href: "https://icones.js.org/",
        note: "Icon Explorer with Instant searching, powered by Iconify",
      },
    ],
  },
];

/**
 * 友情链接数据源
 * 用于 /friends/ 页面展示
 */

export interface FriendItem {
	id: number;
	title: string;
	imgurl: string;
	desc: string;
	siteurl: string;
	tags: string[];
}

export const friendsData: FriendItem[] = [
	{
		id: 1,
		title: "Makiras",
		imgurl: "https://avatars.githubusercontent.com/u/22570332?v=4",
		desc: "一位非常厉害的开发者，我看不懂他的技术手册。",
		siteurl: "https://makiras.org",
		tags: ["博客", "开发者"],
	},
	{
		id: 2,
		title: "Ringoer",
		imgurl: "https://pic.ringoer.com/__add_elsword_drawn_by_hwansang__sample-0459dceea247bc1e9c4ded245532b1b7.jpg",
		desc: "说实话你们二次元为什么都这么高技术力？",
		siteurl: "https://ringoer.com",
		tags: ["博客", "开发者", "二次元"],
  },
  {
		id: 3,
		title: "缺锌达",
		imgurl: "https://cyd23333.github.io/MyGrideaBlog/images/avatar.png",
		desc: "羽毛球双打搭档，曾经借我的Apex账号疯狂上分导致我排位被按在地上摩擦。",
		siteurl: "https://cyd23333.github.io/MyGrideaBlog",
		tags: ["博客", "羽毛球", "电子"],
  },
  {
		id: 4,
		title: "Kuuhaku",
		imgurl: "https://cdn.jsdelivr.net/gh/kuuhaku-w/blogimg/webelement/avatar_ai.png",
		desc: "你能肩负起国产芯片的复兴的重担吗？我觉得你能。",
		siteurl: "https://kuuhaku.top/",
		tags: ["博客", "电子", "二次元"],
	},
];

export function getFriendsList(): FriendItem[] {
	return friendsData;
}

export function getShuffledFriendsList(): FriendItem[] {
	const shuffled = [...friendsData];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}

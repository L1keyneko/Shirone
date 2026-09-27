/**
 * 技能图谱数据源
 * 用于 /skills/ 页面展示
 */

export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

export interface SkillItem {
	enable?: boolean;
	name: string;
	description?: string;
	icon?: string;
	category: string;
	level: SkillLevel;
}

export const skillsData: SkillItem[] = [
  {
    name: "Python",
    description: "",
    icon: "simple-icons:python",
    category: "code",
    level: "intermediate",
  },
  {
    name: "C#",
    description: "",
    icon: "simple-icons:csharp",
    category: "code",
    level: "beginner",
  },
  {
    name: "Erlang",
    description: "",
    icon: "simple-icons:erlang",
    category: "code",
    level: "intermediate",
  },
	// {
	// 	name: "TypeScript",
	// 	description: "强类型代码架构设计与严谨的接口类型契约编写。",
	// 	icon: "simple-icons:typescript",
	// 	category: "frontend",
	// 	level: "expert",
	// },
];

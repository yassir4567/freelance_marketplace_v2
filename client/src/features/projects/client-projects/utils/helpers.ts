import type { Category } from "@/types/category.types";
import type { Skill } from "@/types/skill.types";

export function getCategoryNameById(
  id: number,
  categories: Category[] | null,
): string | undefined {
  if (!categories) return undefined;
  return categories.find((category) => category.id === id)?.name;
}

export function getSkillNameById(id: number, skills: Skill[] | null) {
  if (!skills) return undefined;
  return skills.find((skill) => skill.id === id)?.name;
}

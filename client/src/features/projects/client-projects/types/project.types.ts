import type { Category } from "@/types/category.types";
import type { Project } from "@/types/project.types";
import type { Skill } from "@/types/skill.types";
import type { Freelancer } from "@/types/user.types";

export type PublishProjectType = Omit<
  Project,
  "id" | "client_id" | "status" | "publishedAt"
> & {
  skills: number[];
};

export type ClientProject = Omit<Project, "client_id" | "category_id"> & {
  skills: Skill[];
};

export type ClientProjectList = Pick<
  Project,
  "id" | "title" | "status" | "publishedAt" | "budget"
> & {
  category: Category;
  deadline?: string;
  freelancer?: Pick<
    Freelancer,
    "id" | "user_id" | "firstName" | "lastName" | "avatar"
  >;
};

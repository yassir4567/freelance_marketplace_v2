import type { Project } from "@/types/project.types";
import type { Skill } from "@/types/skill.types";

export type PublishProjectType = Omit<
  Project,
  "id" | "client_id" | "status" | "publishedAt"
> & {
  skills: number[];
};

export type ClientProject = Omit<Project, "client_id" | "category_id"> & {
  skills: Skill[];
};

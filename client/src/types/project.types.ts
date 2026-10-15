type ProjectStatus = "open" | "in_review" | "in_progress" | "completed";
type ExperienceLevel = "junior" | "mid-level" | "senior";
type Size = "small" | "medium" | "large";
type Duration =
  | "less_than_1_month"
  | "1_to_3_month"
  | "3_to_6_month"
  | "more_than_6_month";

export type Project = {
  id: number;
  title: string;
  description: string;
  budget: number;
  status: ProjectStatus;
  experienceLevel: ExperienceLevel;
  size: Size;
  duration: Duration;
  publishedAt: string;
  category_id: number;
  client_id: number;
};

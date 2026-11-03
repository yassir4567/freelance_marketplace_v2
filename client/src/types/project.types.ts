export type ProjectStatus =
  | "open"
  | "in_review"
  | "in_progress"
  | "completed"
  | "closed"
  | "draft";

type ExperienceLevel = "junior" | "mid-level" | "senior";

type Size = "small" | "medium" | "large";

type Duration =
  | "less_than_1_month"
  | "1_to_2_month"
  | "2_to_4_month"
  | "4_to_6_month"
  | "6_to_9_month"
  | "9_to_10_month"
  | "10_to_12_month"
  | "more_than_1_year";


export type Project = {
  id: number;
  title: string;
  description: string;
  budget: string;
  status: ProjectStatus;
  experienceLevel: ExperienceLevel;
  size: Size;
  duration: Duration;
  publishedAt: string;
  category_id: number;
  client_id: number;
};

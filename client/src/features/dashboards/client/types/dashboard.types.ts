import type { Project } from "../../../../types/project.types";

export type ClientDashboardStats = {
  totalProjects: number;
  activeContracts: number;
  completedProjects: number;
  hiredFreelancers: number;
  totalSpending: number;
};

export type ClientDashboardRecentProject = Pick<
  Project,
  "id" | "title" | "status" | "created_at"
> & {
  proposals_count: number;
};

export type ClientDashboardData = {
  stats: ClientDashboardStats;
  recentProjects: ClientDashboardRecentProject[];
};

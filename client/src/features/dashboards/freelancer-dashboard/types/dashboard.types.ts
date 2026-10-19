import type { ActiveContract } from "@/types/contract.types";
import type { Project } from "@/types/project.types";
import type { User } from "@/types/user.types";

export type FreelancerDashboardStats = {
  totalProjects: number;
  countActiveContracts: number;
  totalEarnings: number;
  escrowPayments: number;
};

export type LatestActiveContracts = Pick<ActiveContract, "id" | "price" | "deadline"> &
  Pick<Project, "title"> & {
    client: Pick<User, "id" | "firstName" | "lastName" | "avatar">;
  };

export type FreelancerDashboardData = {
  stats: FreelancerDashboardStats;
  activeContracts: LatestActiveContracts[];
};

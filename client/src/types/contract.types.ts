type ContractStatus =
  | "pending"
  | "awaiting_freelancer_accept"
  | "active"
  | "completed"
  | "rejected";

type ContractBase = {
  id: number;
  status: ContractStatus;
  contractPdf: string | null;
  description: string | null;
  price: number | null;
  deadline: number | null;
  activatedAt: string | null;
  completedAt: string | null;
};

export type PendingContract = ContractBase & {
  status: "pending";
  contractPdf: null;
  description: null;
  price: null;
  deadline: null;
  activatedAt: null;
  completedAt: null;
};

export type ActiveContract = ContractBase & {
  status: "active";
  contractPdf: string;
  description: string;
  price: number;
  deadline: string;
  activatedAt: string;
  completedAt: null;
};

export type AwaitingFreelancerAcceptContract = ContractBase & {
  status: "awaiting_freelancer_accept";
  contractPdf: string;
  description: string;
  price: number;
  deadline: string;
  activatedAt: null;
  completedAt: null;
};

export type CompletedContract = ContractBase & {
  status: "completed";
  contractPdf: string;
  description: string;
  price: number;
  deadline: number;
  activatedAt: string;
  completedAt: string;
};

export type RejectedContract = ContractBase & {
  status: "rejected";
  contractPdf: null;
  description: null;
  price: null;
  deadline: null;
  activatedAt: null;
  completedAt: null;
};

export type Contract =
  | PendingContract
  | ActiveContract
  | AwaitingFreelancerAcceptContract
  | CompletedContract
  | RejectedContract;

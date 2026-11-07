type ContractStatus =
  | "pending"
  | "awaiting_freelancer_accept"
  | "active"
  | "completed"
  | "rejected"
  | "cancelled";

type ContractBase = {
  id: number;
  status: ContractStatus;
  contractPdf: string | null;
  description: string | null;
  price: number | null;
  deadline: number | null;
  activated_at: string | null;
  completed_at: string | null;
};

export type PendingContract = ContractBase & {
  status: "pending";
  contractPdf: null;
  description: null;
  price: null;
  deadline: null;
  activated_at: null;
  completed_at: null;
};

export type ActiveContract = ContractBase & {
  status: "active";
  contractPdf: string;
  description: string;
  price: number;
  deadline: string;
  activated_at: string;
  completed_at: null;
};

export type AwaitingFreelancerAcceptContract = ContractBase & {
  status: "awaiting_freelancer_accept";
  contractPdf: string;
  description: string;
  price: number;
  deadline: string;
  activated_at: null;
  completed_at: null;
};

export type CompletedContract = ContractBase & {
  status: "completed";
  contractPdf: string;
  description: string;
  price: number;
  deadline: number;
  activated_at: string;
  completed_at: string;
};

export type RejectedContract = ContractBase & {
  status: "rejected";
  contractPdf: null;
  description: null;
  price: null;
  deadline: null;
  activated_at: null;
  completed_at: null;
};

export type Contract =
  | PendingContract
  | ActiveContract
  | AwaitingFreelancerAcceptContract
  | CompletedContract
  | RejectedContract;

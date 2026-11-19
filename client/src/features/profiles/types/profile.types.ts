import type { User } from "@/types/user.types";

export type ClientProfile = User;

export type UpdateClientProfile = Pick<
  User,
  "firstName" | "lastName" | "country" | "city" | "phone" | "avatar"
>;

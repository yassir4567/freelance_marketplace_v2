import type { User } from "./user.types";

export type AuthResponseData = {
  user: User;
  token: string;
};

export type MeData = {
  user: User;
};

import type { ProfileCompelation, User } from "./user.types";

export type AuthResponseData = {
  user: User;
  token: string;
  profile: ProfileCompelation;
};

export type MeData = {
  user: User;
  profile: ProfileCompelation;
};

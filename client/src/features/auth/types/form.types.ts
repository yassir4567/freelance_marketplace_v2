import type { RegisterCredentials } from "../../../types/user.types";

export type RegisterForm = Omit<RegisterCredentials, "role"> & {
  role: RegisterCredentials["role"] | null;
};

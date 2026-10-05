type Role = "client" | "freelancer" | "admin";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = LoginCredentials & {
  role: Exclude<Role, "admin">;
  firstName: string;
  lastName: string;
};

import { type MeData, type AuthResponseData } from "../types/auth.types";
import type {
  LoginCredentials,
  RegisterCredentials,
} from "../types/user.types";
import { request } from "./config.api";

const authApi = {
  me() {
    return request<MeData>("/me");
  },
  login(credentials: LoginCredentials) {
    return request<AuthResponseData>("/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  register(credentials: RegisterCredentials) {
    return request<AuthResponseData>("/register", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  logout() {
    return request<null>("/logout", {
      method: "POST",
    });
  },
};

export { authApi };

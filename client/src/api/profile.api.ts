import type {
  ClientProfile,
  UpdateClientProfile,
} from "@/features/profiles/types/profile.types";
import { request } from "./config.api";

export const profileApi = {
  get() {
    return request<ClientProfile>("/client/profile");
  },
  update(form: UpdateClientProfile) {
    return request<ClientProfile>("/client/profile", {
      method: "PUT",
      body: JSON.stringify(form),
    });
  },
};

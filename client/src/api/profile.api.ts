import type { ClientProfile } from "@/features/profiles/types/profile.types";
import { request } from "./config.api";

export const profileApi = {
  get() {
    return request<ClientProfile>("/client/profile");
  },
  update(form: FormData) {
    return request<ClientProfile>("/client/profile", {
      method: "PUT",
      body: form,
    });
  },
};

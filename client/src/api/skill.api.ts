import type { Skill } from "@/types/skill.types";
import { request } from "./config.api";

const skillApi = {
  getAll() {
    return request<Skill[]>("/skills");
  },
};

export { skillApi };

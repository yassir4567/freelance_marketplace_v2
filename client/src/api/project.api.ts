import type {
  ClientProject,
  PublishProjectType,
} from "@/features/projects/client-projects/types/project.types";
import { request } from "./config.api";

const projectApi = {
  publish(form: PublishProjectType) {
    return request<ClientProject>("/client/projects", {
      method: "POST",
      body: JSON.stringify(form),
    });
  },
};

export { projectApi };

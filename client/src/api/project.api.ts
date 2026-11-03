import {
  type ClientProjectDetails,
  type ClientProject,
  type ClientProjectList,
  type PublishProjectType,
} from "@/features/projects/client-projects/types/project.types";
import { request } from "./config.api";

const projectApi = {
  publish(form: PublishProjectType) {
    return request<ClientProject>("/client/projects", {
      method: "POST",
      body: JSON.stringify(form),
    });
  },
  getAll(query: string) {
    return request<ClientProjectList[]>(`/client/projects${query}`);
  },
  getDetails(id: string) {
    return request<ClientProjectDetails>(`/client/projects/${id}`);
  },
};

export { projectApi };

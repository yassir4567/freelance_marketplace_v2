import type { Category } from "@/types/category.types";
import { request } from "./config.api";

const categoryApi = {
  getAll() {
    return request<Category[]>("/categories");
  },
};

export {categoryApi}
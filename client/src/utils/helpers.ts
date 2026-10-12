import dayjs from "dayjs";

export function getToken() {
  return localStorage.getItem("auth_token");
}

export function formatDate(date: string) {
  return dayjs(date).format("MMM DD , YYYY");
}

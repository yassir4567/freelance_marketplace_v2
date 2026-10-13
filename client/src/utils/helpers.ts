import dayjs from "dayjs";

export function getToken() {
  return localStorage.getItem("auth_token");
}

export function formatDate(date: string) {
  return dayjs(date).format("MMM DD , YYYY");
}

export function getUserInitials(firstName: string, lastName: string) {
  let initials = "";
  if (firstName.trim() !== "") initials += firstName[0];
  if (lastName.trim() !== "") initials += lastName[0];
  return initials.toUpperCase();
}

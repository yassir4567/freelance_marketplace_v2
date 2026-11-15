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

export function removeSpecialCharacter(value: string, special: string) {
  return value.split(special).join(" ");
}

export function getErrorMessage(status: number) {
  switch (status) {
    case 401:
      return "Your session has expired. Please log in again.";
    case 403:
      return "You are not authorized to access these projects.";
    case 500:
      return "Something went wrong while loading your projects.";
    case 503:
      return "The service is temporarily unavailable.";
    case null:
      return "Unable to connect. Please check your internet connection.";
    default:
      return "Unable to load your projects. Please try again.";
  }
}

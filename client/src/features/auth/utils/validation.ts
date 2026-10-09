import type { RegisterForm } from "../types/form.types";
import { isValidEmail } from "./helpers";

export const validateRegisterForm = (form: RegisterForm) => {
  const errors: Record<keyof RegisterForm, string> = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  };

  if (!form.firstName.trim()) {
    errors.firstName = "First Name Is Required";
  } else if (form.firstName.trim().length < 2) {
    errors.firstName = "First Name should be at least 3 characters";
  }

  if (!form.lastName.trim()) {
    errors.lastName = "Last Name Is Required";
  } else if (form.lastName.trim().length < 2) {
    errors.lastName = "Last Name should be at least 3 characters";
  }

  if (!form.email.trim()) {
    errors.email = "Email Is Required";
  } else if (!isValidEmail(form.email)) {
    errors.email = "Invalid Email";
  }

  if (!form.password.trim()) {
    errors.password = "Password Is Required";
  } else if (form.password.trim().length < 8) {
    errors.password = "Password should be at least 8 characters";
  }

  if (form.role == null) {
    errors.role = "Role Is Required";
  } else if (form.role !== "client" && form.role !== "freelancer") {
    errors.role = "Role should be client or freelancer";
  }

  return errors;
};

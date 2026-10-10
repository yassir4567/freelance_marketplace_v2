import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { FormField } from "../../../components/ui/FormField";
import { Input } from "../../../components/ui/Input";
import styles from "../styles/Register.module.css";
import React, { useState } from "react";
import type { RegisterForm } from "../types/form.types";
import { useAuth } from "../../../context/AuthContext";
import { validateRegisterForm } from "../utils/validation";
import type { RegisterCredentials } from "../../../types/user.types";
import { GetFieldError } from "../utils/helpers";

const InitErrors: Record<keyof RegisterForm, string> = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: "",
};

export default function RegisterForm() {
  const { user, register } = useAuth();
  const [form, setForm] = useState<RegisterForm>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: null,
  });
  const [errors, setErrors] =
    useState<Record<keyof RegisterForm, string>>(InitErrors);
  const [generalError, setGeneralError] = useState("");

  const navigate = useNavigate();

  if (user) {
    return <Navigate to={`/${user.role}/dashboard`} replace={true} />;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors(InitErrors);
    setGeneralError("");

    const validationErrors = validateRegisterForm(form);

    const checkErrors = Object.values(validationErrors).some(
      (e) => e.trim() != "",
    );

    if (checkErrors) {
      setErrors(validationErrors);
      return;
    }

    if (form.role === null) return;

    const payload: RegisterCredentials = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      role: form.role,
    };

    const result = await register(payload);

    if (!result.success) {
      if (result.status == 422 && result.errors !== null) {
        const firstNameError = GetFieldError(result.errors, "firstName");
        const lastNameError = GetFieldError(result.errors, "lastName");
        const emailError = GetFieldError(result.errors, "email");
        const passwordError = GetFieldError(result.errors, "password");
        const roleError = GetFieldError(result.errors, "role");
        setErrors({
          firstName: firstNameError,
          lastName: lastNameError,
          email: emailError,
          password: passwordError,
          role: roleError,
        });
      } else {
        setGeneralError("Unable to connect to the server, Try again please");
      }
      return;
    }

    navigate(`/${result.user.role}/dashboard`, { replace: true });
  };

  return (
    <div className={styles.formWrapper}>
      <h1 className={styles.title}>Create Your Account</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {generalError && <div className="error">{generalError}</div>}
        <div className={styles.fullNameFields}>
          <FormField
            label="First Name"
            className={styles.field}
            error={errors.firstName}
          >
            <Input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleInputChange}
              placeholder="Enter your first name"
              className={styles.input}
            />
          </FormField>
          <FormField
            label="Last Name"
            className={styles.field}
            error={errors.lastName}
          >
            <Input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleInputChange}
              placeholder="Enter your last name"
              className={styles.input}
            />
          </FormField>
        </div>
        <FormField label="Email" className={styles.field} error={errors.email}>
          <Input
            type="text"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            className={styles.input}
          />
        </FormField>
        <FormField
          label="Password"
          className={styles.field}
          error={errors.password}
        >
          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            className={styles.input}
          />
        </FormField>
        <div className={styles.rolesWrapper}>
          <div className={styles.roles}>
            <FormField label="Freelancer" className={styles.role}>
              <Input
                type="radio"
                name="role"
                value="freelancer"
                checked={form.role === "freelancer"}
                onChange={handleInputChange}
              />
            </FormField>
            <FormField label="Client" className={styles.role}>
              <Input
                type="radio"
                name="role"
                value="client"
                checked={form.role === "client"}
                onChange={handleInputChange}
              />
            </FormField>
          </div>
          {errors.role.trim() != "" && (
            <div className={styles.error}>{errors.role}</div>
          )}
        </div>

        <Button type="submit" variant="primary">
          Signup
        </Button>
      </form>
      <div className={styles["signup-info"]}>
        <p>You have already an account ?</p>
        <Link to="/login" className={styles.signup}>
          log in
        </Link>
      </div>
    </div>
  );
}
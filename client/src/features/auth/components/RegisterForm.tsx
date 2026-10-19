import { Link, Navigate, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import type { RegisterForm } from "../types/form.types";
import { useAuth } from "@/context/AuthContext";
import { validateRegisterForm } from "../utils/validation";
import type { RegisterCredentials } from "@/types/user.types";
import { GetFieldError } from "../utils/helpers";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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
    <form className="w-150" onSubmit={handleSubmit}>
      <h1 className="text-xl text-sky-600 font-semibold text-center mb-12">
        Create Your Account
      </h1>
      {generalError && (
        <div className="bg-red-100 text-red-800 text-sm font-medium capitalize mb-8 px-4 py-3 rounded-md">
          {generalError}
        </div>
      )}
      <FieldGroup className="gap-8">
        <div className="grid max-w-sm grid-cols-2 gap-4">
          <Field>
            <FieldLabel className="text-sm font-normal text-blue-700">
              First Name
            </FieldLabel>
            <Input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleInputChange}
              placeholder="Enter your first name"
              className="w-full border border-sky-200 shadow-none focus:outline-none h-10 px-4"
            />
            {errors.firstName && <FieldError>{errors.firstName}</FieldError>}
          </Field>
          <Field>
            <FieldLabel className="text-sm font-normal text-blue-700">
              Last Name
            </FieldLabel>
            <Input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleInputChange}
              placeholder="Enter your last name"
              className="w-full border border-sky-200 shadow-none focus:outline-none h-10 px-4"
            />
            {errors.lastName && <FieldError>{errors.lastName}</FieldError>}
          </Field>
        </div>
        <Field>
          <FieldLabel className="text-sm font-normal text-blue-700">
            Email
          </FieldLabel>
          <Input
            type="text"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            placeholder="Enter your email (ex@gm.co)"
            className="w-full border border-sky-200 shadow-none focus:outline-none h-10 px-4"
          />
          {errors.email && <FieldError>{errors.email}</FieldError>}
        </Field>
        <Field>
          <FieldLabel className="text-sm font-normal text-blue-700">
            Password
          </FieldLabel>
          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            className="w-full border border-sky-200 shadow-none focus:outline-none h-10 px-4"
          />
          {errors.password && <FieldError>{errors.password}</FieldError>}
        </Field>

        <RadioGroup
          value={form.role}
          name="role"
          onValueChange={(value) => {
            setForm((prev) => ({ ...prev, role: value }));
          }}
          className="flex justify-evenly"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem
              value="freelancer"
              id="freelancer"
              className="border-blue-400 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 text-white"
            />
            <Label htmlFor="freelancer">Freelancer</Label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem
              value="client"
              id="client"
              className="border-blue-500 text-blue-600 data-[state=checked]:border-blue-600"
            />
            <Label htmlFor="client">Client</Label>
          </div>
        </RadioGroup>

        <Button variant="primary" size="lg" type="submit">
          Register
        </Button>

        <div className="flex text-sm items-center justify-center gap-2">
          <p className="text-gray-600">Do you have an account?</p>
          <Link
            to="/login"
            className="text-blue-500 capitalize hover:text-blue-600"
          >
            login
          </Link>
        </div>
      </FieldGroup>
    </form>
  );
}

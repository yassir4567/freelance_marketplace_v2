import { Link, Navigate, useNavigate } from "react-router-dom";
import type { LoginCredentials } from "@/types/user.types";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { GetFieldError } from "../utils/helpers";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const navigate = useNavigate();

  const { user, login } = useAuth();
  const [form, setForm] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<keyof LoginCredentials, string>>({
    email: "",
    password: "",
  });

  const [generalError, setGeneralError] = useState("");

  if (user) {
    return <Navigate to={`/${user.role}/dashboard`} replace={true} />;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors({ email: "", password: "" });
    setGeneralError("");

    const result = await login(form);

    if (!result.success) {
      if (result.status == 422 && result.errors !== null) {
        const emailError = GetFieldError(result.errors, "email");
        const passwordError = GetFieldError(result.errors, "password");
        setErrors({
          email: emailError ?? "",
          password: passwordError ?? "",
        });
      } else if (result.status == 401) {
        setGeneralError("Invalid Credentials");
      } else {
        setGeneralError("Unable to connect to server, Please try again");
      }

      return;
    }

    navigate(`/${result.user.role}/dashboard`, { replace: true });
  };
  return (
    <form className="w-87" onSubmit={handleSubmit}>
      <h1 className="text-xl text-sky-600 font-semibold text-center mb-8">
        Login
      </h1>
      {generalError && (
        <div className="bg-red-100 text-red-800 text-sm font-medium capitalize mb-8 px-4 py-3 rounded-md">
          {generalError}
        </div>
      )}
      <FieldGroup>
        <Field>
          <FieldLabel className="text-sm font-normal text-blue-700">
            Email
          </FieldLabel>
          <Input
            type="text"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
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

        <Button variant="primary" size="lg" type="submit">
          Login
        </Button>

        <div className="flex text-sm items-center justify-center gap-2">
          <p className="text-gray-600">Don't you have an account?</p>
          <Link
            to="/register"
            className="text-blue-500 capitalize hover:text-blue-600"
          >
            signup
          </Link>
        </div>
      </FieldGroup>
    </form>
  );
}

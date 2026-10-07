import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { FormField } from "../../../components/ui/FormField";
import { Input } from "../../../components/ui/Input";
import type { LoginCredentials } from "../../../types/user.types";
import styles from "../styles/Login.module.css";
import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";
import { GetFieldError } from "../utils/helpers";

export function LoginForm() {
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
    navigate(`/${user.role}/dashboard`, { replace: true });
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
    <div className={styles.formWrapper}>
      <h1 className={styles.title}>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        {generalError && <div className={styles.error}>{generalError}</div>}
        <FormField label="Email" className={styles.field} error={errors.email}>
          <Input
            type="text"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            placeholder="Enter Your Email..."
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
            placeholder="Enter Your Password..."
          />
        </FormField>

        <Button type="submit" variant="primary">
          Login
        </Button>
      </form>
      <div className={styles["signup-info"]}>
        <p>You don't have account?</p>
        <Link to="/register" className={styles.signup}>
          sign up
        </Link>
      </div>
    </div>
  );
}

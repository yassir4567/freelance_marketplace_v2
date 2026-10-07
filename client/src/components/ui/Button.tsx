import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "../styles/Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
}

export function Button({
  children,
  variant = "primary",
  ...props
}: ButtonProps) {
  const classVariant = `button-${variant}`;

  return (
    <button {...props} className={`${styles.button} ${styles[classVariant]}`}>
      {children}
    </button>
  );
}

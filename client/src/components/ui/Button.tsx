import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "../styles/Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
}

export function Button({
  children,
  variant,
  className,
  ...props
}: ButtonProps) {
  const classVariant = `button-${variant}`;

  return (
    <button
      {...props}
      className={`${styles.button} ${styles[classVariant]} ${className ?? ""}`}
    >
      {children}
    </button>
  );
}

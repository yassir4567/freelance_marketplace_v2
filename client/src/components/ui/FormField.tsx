import styles from "../styles/FormField.module.css";
import type { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

export function FormField({
  children,
  label,
  htmlFor,
  error,
  className,
}: FormFieldProps) {
  return (
    <div className={`${className} ${styles.field}`}>
      <label htmlFor={htmlFor} className={styles.label}>
        {label}
      </label>
      {children}
      {error?.trim() != "" && <div className={styles.error}>{error}</div>}
    </div>
  );
}

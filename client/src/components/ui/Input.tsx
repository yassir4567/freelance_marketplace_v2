import type { InputHTMLAttributes } from "react";
import styles from "../styles/Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return <input {...props} className={`${styles.input} ${className ?? ""}`} />;
}

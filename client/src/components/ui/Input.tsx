import styles from "./styles/Input.module.css";

interface InputProps {
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function Input({
  type = "text",
  value,
  onChange,
  name,
  placeholder,
  disabled = false,
  className,
}: InputProps) {
  return (
    <input
      type={type}
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
      className={`${styles.input} ${className ?? ""}`}
    />
  );
}

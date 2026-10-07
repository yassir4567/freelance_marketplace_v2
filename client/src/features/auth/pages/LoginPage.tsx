import styles from "../styles/Login.module.css";
import { LoginForm } from "../components/LoginForm";

export function LoginPage() {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
}

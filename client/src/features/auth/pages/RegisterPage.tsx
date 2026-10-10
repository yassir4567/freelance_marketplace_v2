import styles from "../styles/Register.module.css";
import RegisterForm from "../components/RegisterForm";

function RegisterPage() {
  return (
    <div className={styles.container}>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;

import RegisterForm from "../components/RegisterForm";
import styles from "../styles/Register.module.css";

function RegisterPage() {
  return (
    <div className={styles.container}>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;

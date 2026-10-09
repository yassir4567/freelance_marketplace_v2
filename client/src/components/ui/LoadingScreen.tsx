import styles from "../styles/LoadingScreen.module.css";

interface LoadingScreenProps {
  text: string;
  placeholder: string;
}

export default function LoadingScreen({
  text,
  placeholder,
}: LoadingScreenProps) {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}>
        <div className={styles.loading} />
      </div>
      <h3 className={styles.text}>{text}</h3>
      <p className={styles.placeholder}>{placeholder}</p>
    </div>
  );
}

import type { ReactNode } from "react";
import styles from "../styles/StateCard.module.css";

interface StateCardProps {
  children: ReactNode;
}

export default function StateCard({ children }: StateCardProps) {
  return <div className={styles.card}>{children}</div>;
}

import { Link } from "react-router-dom";
import styles from "../styles/NavBar.module.css";

interface NavBarProps {
  links: Record<string, string>[];
}

export default function NavBar({ links }: NavBarProps) {
  return (
    <nav className={styles.navbar}>
      <ul className={styles["nav-items"]}>
        {links.map((link) => (
          <li key={link.label} className={styles["nav-item"]}>
            <Link to={link.to} className={styles["nav-link"]}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

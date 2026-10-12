import styles from "../styles/Header.module.css";
import Logo from "../ui/Logo";
import UserProfile from "../ui/UserProfile";
import NavBar from "./NavBar";

interface HeaderProps {
  links: Record<string, string>[];
}

export default function Header({ links }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <NavBar links={links} />
      <UserProfile />
    </header>
  );
}

import styles from "../styles/Header.module.css";
import Logo from "../ui/Logo";
import UserProfile from "../ui/UserProfile";
import NavBar from "./NavBar";

interface HeaderProps {
  links: Record<string, string>[];
  fullName: string;
}

export default function Header({ links, fullName }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <NavBar links={links} />
      <UserProfile fullName={fullName} />
    </header>
  );
}

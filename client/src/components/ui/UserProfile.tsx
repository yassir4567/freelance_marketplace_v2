import styles from "../styles/UserProfile.module.css";
import avatar from "../../assets/images/avatar.png";
import { useAuth } from "../../context/AuthContext";

export default function UserProfile() {
  const { logout } = useAuth();
  const handleLogOut = async () => {
    await logout();
    localStorage.removeItem("auth_token");
  };
  return (
    <div className={styles.profile}>
      <div className={styles.avatarImg}>
        <img src={avatar} alt="avatar" />
      </div>
      <div className={styles.content}>
        <p className={styles.name}>Yassir Laaouisset</p>
        <button className={styles.logout} onClick={handleLogOut}>
          Logout
        </button>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import styles from "../styles/UserProfileMenuProps.module.css";
import { useRequiredAuth } from "../../context/AuthContext";

interface UserProfileMenuProps {}

function UserProfileMenu({}: UserProfileMenuProps) {
  const { user, logout } = useRequiredAuth();

  const handleLogOut = async () => {
    await logout();
    localStorage.removeItem("auth_token");
  };

  const role = user.role;

  return (
    <div className={styles["user-menu"]}>
      <Link to={`/${role}/profile`} className={styles["profile-link"]}>
        Profile
      </Link>
      <button className={styles["log-out-btn"]} onClick={handleLogOut}>
        Logout
      </button>
    </div>
  );
}

export default UserProfileMenu;

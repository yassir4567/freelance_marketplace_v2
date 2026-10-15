import styles from "../styles/UserProfile.module.css";
import { useRequiredAuth } from "../../context/AuthContext";
import { getUserInitials } from "../../utils/helpers";
import { MdKeyboardArrowDown } from "react-icons/md";
import useShow from "../../hooks/useShow";
import UserProfileMenu from "../layout/UserProfileMenu";

export default function UserProfile() {
  const { isOpen, onToggle } = useShow();
  const { user } = useRequiredAuth();

  const userInitials = getUserInitials(user.firstName, user.lastName);

  return (
    <div className={styles.profile}>
      <div className={styles.avatarIcon}>{userInitials}</div>
      <div className={styles.arrow}>
        <MdKeyboardArrowDown
          size={20}
          onClick={onToggle}
          className={`${isOpen && styles["swap-arrow"]} ${styles["arrow"]}`}
        />
      </div>

      {isOpen && <UserProfileMenu />}
    </div>
  );
}

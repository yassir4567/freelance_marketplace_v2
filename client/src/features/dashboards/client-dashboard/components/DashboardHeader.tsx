import { Link } from "react-router-dom";
import { useRequiredAuth } from "../../../../context/AuthContext";
import styles from "../styles/ClientDashboard.module.css";
import { HiOutlinePlusSmall } from "react-icons/hi2";


function DashboardHeader() {
  const { user } = useRequiredAuth();

  const fullName = user.firstName + " " + user.lastName;

  return (
    <div className={styles.header}>
      <div className={styles.greeting}>
        <h3 className={styles.welcome}>Welcome {fullName}</h3>
        <p className={styles.description}>Here's your dashboard</p>
      </div>
      <div className={styles.action}>
        <Link to="/client/post-project" className={styles["post-project-link"]}>
          <span>Post Project</span>
          <HiOutlinePlusSmall />
        </Link>
      </div>
    </div>
  );
}

export default DashboardHeader;

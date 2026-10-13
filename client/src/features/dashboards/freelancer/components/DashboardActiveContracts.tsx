import { Link } from "react-router-dom";
import styles from "../styles/FreelancerDashboard.module.css";
import type { LatestActiveContracts } from "../types/dashboard.types";
import { MdArrowOutward } from "react-icons/md";
import ActiveContractsTable from "./ActiveContractsTable";

interface DashboardActiveContractsProps {
  activeContracts: LatestActiveContracts[];
}

export default function DashboardActiveContracts({
  activeContracts,
}: DashboardActiveContractsProps) {
  return (
    <div className={styles["active-contracts-container"]}>
      <div className={styles["active-contracts-header"]}>
        <h3 className={styles["active-contracts-title"]}>Active Contracts</h3>
        <Link
          to="/freelancer/contracts"
          className={styles["active-contracts-link"]}
        >
          <span>View all contracts</span>
          <MdArrowOutward />
        </Link>
      </div>

      {activeContracts.length === 0 ? (
        <div className={styles["empty-table"]}>
          You do not have active contracts yet
        </div>
      ) : (
        <ActiveContractsTable activeContracts={activeContracts} />
      )}
    </div>
  );
}

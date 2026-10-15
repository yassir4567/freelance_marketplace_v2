import { Link } from "react-router-dom";
import styles from "../styles/FreelancerDashboard.module.css";
import type { LatestActiveContracts } from "../types/dashboard.types";
import { MdArrowOutward } from "react-icons/md";
import ActiveContractsTable from "./ActiveContractsTable";

interface DashboardActiveContractsProps {
  contracts: LatestActiveContracts[];
}

export default function DashboardActiveContracts({
  contracts,
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

      {contracts.length === 0 ? (
        <div className={styles["active-contracts-empty-table"]}>
          You have not had any active contracts yet
        </div>
      ) : (
        <ActiveContractsTable contracts={contracts} />
      )}
    </div>
  );
}

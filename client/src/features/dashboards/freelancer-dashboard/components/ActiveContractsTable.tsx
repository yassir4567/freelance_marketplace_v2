import type { LatestActiveContracts } from "../types/dashboard.types";
import styles from "../styles/FreelancerDashboard.module.css";
import { formatDate } from "../../../../utils/helpers";
import { Link } from "react-router-dom";

interface ActiveContractsTableProps {
  contracts: LatestActiveContracts[];
}

function ActiveContractsTable({ contracts }: ActiveContractsTableProps) {
  return (
    <table className={styles["active-contracts-table"]}>
      <thead>
        <tr>
          <th className={styles["col-title"]}>Title</th>
          <th className={styles["col-client"]}>Client</th>
          <th className={styles["col-price"]}>Price</th>
          <th className={styles["col-deadline"]}>Deadline</th>
          <th className={styles["col-actions"]}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {contracts.map((contract) => (
          <tr key={contract.id}>
            <td>{contract.title}</td>
            <td>
              {contract.client.firstName + " " + contract.client.lastName}
            </td>
            <td>{contract.price}</td>
            <td>{formatDate(contract.deadline)}</td>
            <td>
              <Link
                to={`/freelancer/contracts/${contract.id}`}
                className={styles["view-details-action"]}
              >
                View details
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ActiveContractsTable;

import type { LatestActiveContracts } from "../types/dashboard.types";
import styles from "../styles/FreelancerDashboard.module.css";
import { formatDate } from "../../../../utils/helpers";
import { Link } from "react-router-dom";

interface ActiveContractsTableProps {
  activeContracts: LatestActiveContracts[];
}

function ActiveContractsTable({ activeContracts }: ActiveContractsTableProps) {
  return (
    <table className={styles["active-contracts-table"]} cellSpacing={0}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Client</th>
          <th>Price</th>
          <th>Deadline</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {activeContracts.map((contract) => (
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
                className={styles["active-contract-link"]}
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

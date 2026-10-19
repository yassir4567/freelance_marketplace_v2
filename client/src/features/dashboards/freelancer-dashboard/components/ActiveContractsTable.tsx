import type { LatestActiveContracts } from "../types/dashboard.types";
 import { formatDate } from "@/utils/helpers";
import { Link } from "react-router-dom";

interface ActiveContractsTableProps {
  contracts: LatestActiveContracts[];
}

function ActiveContractsTable({ contracts }: ActiveContractsTableProps) {
  return (
    <table className="w-full table-fixed border-collapse">
      <thead className="h-15">
        <tr>
          <th className="text-center w-full p-4 border-b text-gray-400 border-gray-300 text-sm font-medium tracking-wide">
            Title
          </th>
          <th className="text-center w-32 p-4 border-b text-gray-400 border-gray-300 text-sm font-medium tracking-wide">
            Client
          </th>
          <th className="text-center w-32 p-4 border-b text-gray-400 border-gray-300 text-sm font-medium tracking-wide">
            Price
          </th>
          <th className="text-center w-32 p-4 border-b text-gray-400 border-gray-300 text-sm font-medium tracking-wide">
            Deadline
          </th>
          <th className="text-center w-32 p-4 border-b text-gray-400 border-gray-300 text-sm font-medium tracking-wide">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {contracts.map((contract) => (
          <tr key={contract.id}>
            <td className="p-4 border-b border-solid border-gray-300 text-sm">
              {contract.title}
            </td>
            <td className="p-4 border-b border-solid border-gray-300 text-sm">
              {contract.client.firstName + " " + contract.client.lastName}
            </td>
            <td className="p-4 border-b border-solid border-gray-300 text-sm">
              {contract.price}
            </td>
            <td className="p-4 border-b border-solid border-gray-300 text-sm">
              {formatDate(contract.deadline)}
            </td>
            <td className="p-4 border-b border-solid border-gray-300 text-sm">
              <Link
                to={`/freelancer/contracts/${contract.id}`}
                className="text-xs text-blue-500 hover:text-blue-600"
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

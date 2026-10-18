import { Link } from "react-router-dom";
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
    <div className="mt-2">
      <div className="flex justify-between mb-5">
        <h3 className="text-md font-medium text-blue-500">Active Contracts</h3>
        <Link
          to="/freelancer/contracts"
          className="flex items-center gap-2 text-blue-500 hover:text-blue-600 text-sm"
        >
          <span>View all contracts</span>
          <MdArrowOutward />
        </Link>
      </div>

      {contracts.length === 0 ? (
        <div className="text-red-500 mt-20 text-center bg-gray-100 h-12 flex items-center justify-center rounded-lg text-sm">
          You have not had any active contracts yet
        </div>
      ) : (
        <ActiveContractsTable contracts={contracts} />
      )}
    </div>
  );
}

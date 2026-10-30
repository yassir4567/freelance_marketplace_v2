import { Link } from "react-router-dom";
import type { FreelancerDashboardData } from "../types/dashboard.types";
import { MdArrowOutward } from "react-icons/md";
import ActiveContractsTable from "./ActiveContractsTable";

interface DashboardActiveContractsProps {
  data: FreelancerDashboardData | null;
  isLoading: boolean;
}

export default function DashboardActiveContracts({
  data,
  isLoading,
}: DashboardActiveContractsProps) {
  return (
    <div className="mt-2">
      <div className="flex justify-between bg-red-498 mb-5">
        <h3 className="text-xl font-medium">Active Contracts</h3>
        <Link
          to="/freelancer/contracts"
          className="flex items-center gap-2 text-blue-500 hover:text-blue-600 text-sm"
        >
          <span>View all contracts</span>
          <MdArrowOutward />
        </Link>
      </div>

      {isLoading ? (
        <div className="text-blue-500 mt-25 text-center bg-gray-100 h-12 flex items-center justify-center rounded-lg text-sm">
          Loading contracts...
        </div>
      ) : data === null || data.activeContracts.length === 0 ? (
        <div className="text-red-500 mt-25 text-center bg-gray-100 h-12 flex items-center justify-center rounded-lg text-sm">
          You have not had any active contracts
        </div>
      ) : (
        <ActiveContractsTable contracts={data.activeContracts} />
      )}
    </div>
  );
}

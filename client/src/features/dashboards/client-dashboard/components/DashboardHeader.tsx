import { Link } from "react-router-dom";
import { useRequiredAuth } from "@/context/AuthContext";
import { HiOutlinePlusSmall } from "react-icons/hi2";

function DashboardHeader() {
  const { user } = useRequiredAuth();

  return (
    <div className="flex justify-between">
      <div>
        <h3 className="font-normal text-lg capitalize">
          Welcome {user.firstName}
        </h3>
        <p className="mx-2 text-sm text-gray-500">Here's your dashboard</p>
      </div>
      <div>
        <Link
          to="/client/post-project"
          className="bg-transparent border border-blue-500 flex items-center justify-center gap-1 text-sm w-35 p-2 rounded-lg text-blue-500 h-8 hover:text-white hover:bg-blue-500 transition"
        >
          <span>Post Project</span>
          <HiOutlinePlusSmall />
        </Link>
      </div>
    </div>
  );
}

export default DashboardHeader;

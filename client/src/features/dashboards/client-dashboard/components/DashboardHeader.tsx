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
          className="flex justify-center items-center gap-1 rounded-xl border-blue-500 border text-blue-500 w-40 h-10 text-sm hover:border-blue-700 hover:text-blue-700"
        >
          <span>Post Project</span>
          <HiOutlinePlusSmall />
        </Link>
      </div>
    </div>
  );
}

export default DashboardHeader;

import { useRequiredAuth } from "@/context/AuthContext";
import PostProjectBtn from "@/components/shared/PostProjectBtn";

function DashboardHeader() {
  const { user } = useRequiredAuth();

  return (
    <div className="flex justify-between">
      <div>
        <h3 className="text-lg capitalize font-medium">
          Welcome, {user.firstName}
        </h3>
        <p className="mx-2 text-sm text-gray-500">Here's your dashboard</p>
      </div>

      <PostProjectBtn />
    </div>
  );
}

export default DashboardHeader;

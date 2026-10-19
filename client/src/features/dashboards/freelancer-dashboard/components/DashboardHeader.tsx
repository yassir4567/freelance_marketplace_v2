import { useRequiredAuth } from "@/context/AuthContext";

export default function DashboardHeader() {
  const { user } = useRequiredAuth();

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="font-normal text-lg capitalize">
          Welcome {user.firstName}
        </h1>
        <p className="mx-2 text-sm text-gray-500">
          Here's what's happening with your contracts.
        </p>
      </div>
    </div>
  );
}

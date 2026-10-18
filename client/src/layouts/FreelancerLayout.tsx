import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";

export default function FreelancerLayout() {
  const navlinks = [
    {
      label: "Dashboard",
      to: "/freelancer/dashboard",
    },
    {
      label: "Browse Projects",
      to: "/freelancer/browse-project",
    },
    {
      label: "My Proposals",
      to: "/freelancer/proposals",
    },
    {
      label: "Contracts",
      to: "/freelancer/contracts",
    },
    {
      label: "Messages",
      to: "/freelancer/messages",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-30">
      <Header links={navlinks} />
      <main className="mt-15 mx-55">
        <Outlet />
      </main>
    </div>
  );
}

import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";

export default function ClientLayout() {
  const navlinks = [
    {
      label: "Dashboard",
      to: "/client/dashboard",
    },
    {
      label: "Post Project",
      to: "/client/post-project",
    },
    {
      label: "Projects",
      to: "/client/projects",
    },
    {
      label: "Contracts",
      to: "/client/contracts",
    },
    {
      label: "Messages",
      to: "/client/messages",
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

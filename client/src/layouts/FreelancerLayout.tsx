import { Outlet } from "react-router-dom";
import SideBar from "../components/layout/SideBar";
import Header from "@/components/layout/Header";
import { GoHome } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { TbContract } from "react-icons/tb";
import { LuMessageCircle } from "react-icons/lu";
import { GrDocumentTransfer } from "react-icons/gr";

export default function FreelancerLayout() {
  const navlinks = [
    {
      label: "Dashboard",
      to: "/freelancer/dashboard",
      icon: GoHome,
    },
    {
      label: "Browse Projects",
      to: "/freelancer/browse-project",
      icon: IoSearchOutline,
    },
    {
      label: "My Proposals",
      to: "/freelancer/proposals",
      icon: GrDocumentTransfer,
    },
    {
      label: "Contracts",
      to: "/freelancer/contracts",
      icon: TbContract,
    },
    {
      label: "Messages",
      to: "/freelancer/messages",
      icon: LuMessageCircle,
    },
  ];

  return (
    <div className="bg-gray-50 h-dvh flex overflow-hidden">
      <div className="py-3 px-5 shrink-0">
        <SideBar links={navlinks} />
      </div>
      <div className="p-3 flex-1 min-w-0 min-h-0 flex flex-col gap-2">
        <Header />
        <main className="bg-white w-full flex-1 min-h-0 overflow-y-auto rounded-xl p-5 flex justify-center pt-10">
          <div className="w-250">
            <Outlet />
            <div className="h-20 bg-white"></div>
          </div>
        </main>
      </div>
    </div>
  );
}

import { Outlet } from "react-router-dom";
import SideBar from "../components/layout/SideBar";
import { GoHome } from "react-icons/go";
import { VscLiveShare } from "react-icons/vsc";
import { VscPackage } from "react-icons/vsc";
import { TbContract } from "react-icons/tb";
import { LuMessageCircle } from "react-icons/lu";
import Header from "@/components/layout/Header";

export default function ClientLayout() {
  const navlinks = [
    {
      label: "Dashboard",
      to: "/client/dashboard",
      icon: GoHome,
    },
    {
      label: "Post Project",
      to: "/client/post-project",
      icon: VscLiveShare,
    },
    {
      label: "Projects",
      to: "/client/projects",
      icon: VscPackage,
    },
    {
      label: "Contracts",
      to: "/client/contracts",
      icon: TbContract,
    },
    {
      label: "Messages",
      to: "/client/messages",
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

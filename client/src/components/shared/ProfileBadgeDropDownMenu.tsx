import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FiUser } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { RiMenu4Fill } from "react-icons/ri";

import { Link } from "react-router-dom";

interface ProfileBadgeDropDownMenuProps {
  logout: () => Promise<void>;
}

export default function ProfileBadgeDropDownMenu({
  logout,
}: ProfileBadgeDropDownMenuProps) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <button className="cursor-pointer">
              <RiMenu4Fill size={25} className="text-gray-500" />
            </button>
          }
        />
        <DropdownMenuContent>
          <DropdownMenuItem className="p-0 m-0.5">
            <Link to="/client/profile" className="flex items-center gap-2 w-full p-1">
              <FiUser />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={logout}>
            <FiLogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

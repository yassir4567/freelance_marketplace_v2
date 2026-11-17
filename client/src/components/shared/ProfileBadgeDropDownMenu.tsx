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
          render={<RiMenu4Fill size={25} className="text-gray-500" />}
        />
        <DropdownMenuContent>
          <DropdownMenuItem>
            <FiUser />
            <Link to="/client/profile">Profile</Link>
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

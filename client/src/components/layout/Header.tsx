import { useAuth } from "@/context/AuthContext";
import ProfileBadge from "@/features/profiles/components/ProfileBadge";
import ProfileBadgeDropDownMenu from "../shared/ProfileBadgeDropDownMenu";

function Header() {
  const { logout } = useAuth();

  return (
    <header className="text-xs bg-white w-full h-16 px-10 rounded-xl flex items-center justify-end gap-5">
      <ProfileBadge />
      <ProfileBadgeDropDownMenu logout={logout} />
    </header>
  );
}

export default Header;

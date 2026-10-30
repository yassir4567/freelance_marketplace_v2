import { useAuth } from "@/context/AuthContext";
import { AiOutlineLogout } from "react-icons/ai";

function Header() {
  const { logout } = useAuth();

  return (
    <header className="text-xs bg-white w-full h-12 px-2 rounded-xl flex items-center">
      <button
        type="button"
        onClick={async () => await logout()}
        className="ml-auto mr-10 border border-red-500 w-6 h-6 flex items-center justify-center rounded-full hover:"
      >
        <AiOutlineLogout size={15} className="text-rose-400" />
      </button>
    </header>
  );
}

export default Header;

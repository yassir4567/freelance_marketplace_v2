import { useRequiredAuth } from "@/context/AuthContext";
import profile from "@/assets/images/avatar.png";

export default function ProfileBadge() {
  const { user } = useRequiredAuth();

  const fullName = user.firstName + " " + user.lastName;

  return (
    <div className="box-border border h-12 border-gray-200 rounded-lg flex items-center gap-2 px-4 py-1.5 cursor-pointer">
      <div className="w-10 h-10 rounded-[50%] flex items-center justify-center">
        <img src={profile} className="w-full h-full" />
      </div>

      <div>
        <p>{fullName}</p>
        <p className="text-xs text-gray-500">{user.role}</p>
      </div>
    </div>
  );
}

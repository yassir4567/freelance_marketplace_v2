import type { ClientProfile } from "../types/profile.types";
import defaultAvatar from "@/assets/images/avatar.png";

interface ProfileOverviewProps {
  overview: Pick<ClientProfile, "firstName" | "lastName" | "avatar" | "role">;
}

export default function ProfileOverview({ overview }: ProfileOverviewProps) {
  const fullName = overview.firstName + " " + overview.lastName;
  return (
    <div className="w-full flex flex-col items-center border border-gray-300 rounded-2xl py-6 px-1 ">
      <div className="w-35 h-35 rounded-full border border-gray-500">
        <img
          src={overview.avatar ?? defaultAvatar}
          className="size-full rounded-full object-cover ring-2 ring-white shadow-md"
          alt="Avatar"
        />
      </div>

      <div className="mt-5">
        <p className="text-lg text-center">{fullName} </p>
        <p className="text-md text-center text-gray-600">{overview.role}</p>
      </div>
    </div>
  );
}

import type { ClientProfile } from "../types/profile.types";

interface ProfileInformationProps {
  information: Pick<ClientProfile, "phone" | "email">;
}

export default function ProfileInformation({
  information,
}: ProfileInformationProps) {
  return (
    <div className="border border-gray-300 p-3 flex items-center justify-around rounded-2xl">
      <div>
        <span className="text-sm text-gray-400 font-medium">Phone</span>
        <p className="text-gray-800 text-md">{information.phone}</p>
      </div>
      <div>
        <span className="text-sm text-gray-400 font-medium">Email</span>
        <p className="text-gray-800 text-md">{information.email}</p>
      </div>
    </div>
  );
}

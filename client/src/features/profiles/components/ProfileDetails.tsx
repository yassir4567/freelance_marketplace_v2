import type { ClientProfile } from "../types/profile.types";

interface ProfileDetailsProps {
  information: Pick<ClientProfile, "phone" | "email" | "country" | "city">;
}

export default function ProfileDetails({ information }: ProfileDetailsProps) {
  return (
    <div className="flex flex-col gap-5 border border-gray-300 rounded-2xl p-6">
      <div>
        <span className="text-gray-600 font-medium">Email : </span>
        <span>{information.email}</span>
      </div>
      <div>
        <span className="text-gray-600 font-medium">Phone : </span>
        <span>{information.phone}</span>
      </div>
      <div>
        <span className="text-gray-600 font-medium">Country : </span>
        <span>{information.country}</span>
      </div>
      <div>
        <span className="text-gray-600 font-medium">City : </span>
        <span>{information.city}</span>
      </div>
    </div>
  );
}

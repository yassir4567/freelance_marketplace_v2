import type { ClientProfile } from "../types/profile.types";

interface ProfileAddressProps {
  address: Pick<ClientProfile, "country" | "city">;
}
export default function ProfileAddress({ address }: ProfileAddressProps) {
  return (
    <div className="border border-gray-300 p-3 flex items-center justify-around rounded-2xl">
      <div>
        <span className="text-sm text-gray-400 font-medium">Country</span>
        <p className="text-gray-800 text-md">{address.country}</p>
      </div>
      <div>
        <span className="text-sm text-gray-400 font-medium">City</span>
        <p className="text-gray-800 text-md">{address.city}</p>
      </div>
    </div>
  );
}

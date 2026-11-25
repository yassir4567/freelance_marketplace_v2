import { Link } from "react-router-dom";
import LoadingProfileSkeleton from "../components/LoadingProfileSkeleton";
import ProfileError from "../components/ProfileError";
import ProfileOverview from "../components/ProfileOverview";
import { useProfile } from "../hooks/useProfile";
import ProfileDetails from "../components/ProfileDetails";

export default function ClientProfilePage() {
  const { profile, isLoading, error } = useProfile();

  if (isLoading) return <LoadingProfileSkeleton />;

  if (error || !profile)
    return <ProfileError error={error ?? "Profile data not found"} />;

  const profileOverview = {
    firstName: profile.firstName,
    lastName: profile.lastName,
    avatar: profile.avatar,
    role: profile.role,
  };

  const profileInformation = {
    phone: profile.phone,
    email: profile.email,
    country: profile.country,
    city: profile.city,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-medium">Profile Details</h1>
        <Link
          to="/client/profile/edit"
          className="border-b border-b-blue-400 text-blue-400 hover:text-blue-500 hover:border-b-blue-400 transition"
        >
          Edit your profile
        </Link>
      </div>

      <div className="grid grid-cols-[280px_1fr] gap-4">
        <ProfileOverview overview={profileOverview} />
        <main className="flex flex-col gap-4">
          <ProfileDetails information={profileInformation} />
        </main>
      </div>
    </div>
  );
}

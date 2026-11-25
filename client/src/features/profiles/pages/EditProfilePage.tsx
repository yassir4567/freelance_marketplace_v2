import EditProfileForm from "../components/EditProfileForm";
import LoadingProfileSkeleton from "../components/LoadingProfileSkeleton";
import ProfileError from "../components/ProfileError";
import { useProfile } from "../hooks/useProfile";

export default function EditProfilePage() {
  const { profile, isLoading, error } = useProfile();

  if (isLoading) return <LoadingProfileSkeleton />;

  if (error || !profile)
    return <ProfileError error={error ?? "Profile data not found"} />;

  return (
    <div>
      <div>
        <h3 className="text-lg font-medium">Edit your profile</h3>
      </div>
      <div>
        <EditProfileForm profile={profile} />
      </div>
    </div>
  );
}

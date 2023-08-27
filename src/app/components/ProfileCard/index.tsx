import { Profile } from "./elements/Profile";
import { getProfileData } from "@/utils/fetchUtils";

export const ProfileCard = async () => {
  const profileData = await getProfileData();
  if (!profileData) return <div>Error</div>;
  const { name, picture, email, comment } = profileData;
  return (
    <Profile name={name} picture={picture} email={email} comment={comment} />
  );
};

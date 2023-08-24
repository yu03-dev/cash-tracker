import { Profile } from "./elements/Profile";
import { getProfileData } from "@/utils/fetchUtils";

export const ProfileCard = async () => {
  const { name, picture, email, comment } = await getProfileData();
  // 型検証
  return (
    <Profile name={name} picture={picture} email={email} comment={comment} />
  );
};

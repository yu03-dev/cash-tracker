import { fetchData } from "@/app/store/api/server/fetchData";
import { Profile } from "./elements/Profile";
import { ProfileDataType, zProfileData } from "@/types";

export const ProfileCard = async () => {
  const profileData = await fetchData<ProfileDataType>({
    uri: "/api/user/profile",
    schema: zProfileData,
  });
  const { name, picture, email, comment } = profileData;
  return (
    <Profile
      name={name}
      picture={picture}
      email={email}
      comment={comment ?? ""}
    />
  );
};

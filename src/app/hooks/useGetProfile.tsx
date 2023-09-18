import { ProfileDataType, zProfileData } from "@/types";
import { useCallback, useEffect, useState } from "react";

export const useGetProfile = () => {
  const [profile, setProfile] = useState<ProfileDataType>();

  const getProfile = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/profile`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const profileData = zProfileData.parse(await response.json());
      return profileData;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  }, []);

  useEffect(() => {
    getProfile().then((profileData) => {
      if (!profileData) return;
      setProfile(profileData);
    });
  }, [getProfile]);

  return { ...profile };
};

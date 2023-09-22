import { fetchData } from "@/utils/fetchData";
import { ProfileDataType, zProfileData } from "@/types";
import { Avatar, Typography } from "@/app/common/lib/material-tailwind";
import React from "react";

export const Profile = async () => {
  const { name, picture, email } = await fetchData<ProfileDataType>({
    uri: "/api/user/profile",
    schema: zProfileData,
  });
  return (
    <div className="flex justify-between items-center">
      <Avatar src={picture} alt="avatar" />
      <div>
        <Typography variant="h5" color="blue-gray">
          {name}
        </Typography>
        <Typography color="gray">{email}</Typography>
      </div>
    </div>
  );
};

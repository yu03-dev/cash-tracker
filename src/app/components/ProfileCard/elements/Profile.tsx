import {
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Typography,
} from "@/app/common/material-tailwind";
import { StarIcon } from "./StarIcon";
import { ProfileDataType } from "@/types";

export const Profile = ({ name, picture, email, comment }: ProfileDataType) => {
  return (
    <Card
      color="transparent"
      shadow={false}
      className="w-full max-w-[26rem] shadow-md p-8"
    >
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-0 flex items-center gap-4 pt-0 pb-8"
      >
        <Avatar size="lg" variant="circular" src={picture} alt="user icon" />
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              {name}
            </Typography>
            <div className="5 flex items-center gap-0">
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </div>
          </div>
          <Typography color="blue-gray">{email}</Typography>
        </div>
      </CardHeader>
      <CardBody className="mb-6 p-0">
        <Typography>{comment}</Typography>
      </CardBody>
    </Card>
  );
};

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@/app/common/material-tailwind";
import { fetchData } from "@/app/store/api/server/fetchData";
import { z } from "zod";

export const ExpensesCard = async () => {
  const total = await fetchData<number>({
    uri: "/api/user/expenses/total",
    schema: z.number(),
  });
  return (
    <Card>
      <CardHeader className="relative" floated={false} shadow={false}>
        <Typography variant="h4">
          <div className="text-lg md:text-xl lg:text-2xl">
            支給額 - 使用額：
          </div>
        </Typography>
      </CardHeader>
      <CardBody className="flex justify-center">
        {total >= 0 ? (
          <Typography variant="h4" color="blue-gray">
            <div className="text-5xl md:text-6xl lg:text-7xl">{`¥ ${total}`}</div>
          </Typography>
        ) : (
          <Typography variant="h4" color="red">
            <div className="text-5xl md:text-6xl lg:text-7xl">{`¥ ${total}`}</div>
          </Typography>
        )}
      </CardBody>
    </Card>
  );
};

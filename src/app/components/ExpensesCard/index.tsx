import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@/app/components/material-tailwind-wrapper";
import { getTotalExpenses } from "@/utils/fetchUtils";

export const ExpensesCard = async () => {
  const total = await getTotalExpenses();
  if (typeof total === "undefined") return <div>Error</div>;
  return (
    <Card className="w-1/2">
      <CardHeader className="relative" floated={false} shadow={false}>
        <Typography variant="h5">
          <div>支給額 - 使用額：</div>
        </Typography>
      </CardHeader>
      <CardBody className="flex justify-center">
        {total >= 0 ? (
          <Typography variant="h1" color="blue-gray">
            <div>{`¥ ${total}`}</div>
          </Typography>
        ) : (
          <Typography variant="h1" color="red">
            <div>{`¥ ${total}`}</div>
          </Typography>
        )}
      </CardBody>
    </Card>
  );
};

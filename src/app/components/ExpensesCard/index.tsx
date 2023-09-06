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

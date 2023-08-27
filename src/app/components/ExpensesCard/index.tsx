import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
  Button,
} from "@/app/components/material-tailwind-wrapper";
import { getTotalExpenses } from "@/utils/fetchUtils";

export const TotalExpenses = async () => {
  const total = await getTotalExpenses();
  if (!total) return <div>Error</div>;
  return (
    <Typography variant="h4" color="blue-gray">
      <div>{"収支：¥" + total}</div>
    </Typography>
  );
};

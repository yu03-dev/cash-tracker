import cn from "@/app/common/lib/cn";
import { DoughnutChart } from "./DoughnutChart";
import { Card, Typography } from "@/app/common/lib/material-tailwind";
import { fetchData } from "@/app/store/api/server/fetchData";
import { ExpenseByCategoryType, zExpenseByCategory } from "@/types";
import { HTMLAttributes } from "react";

export const MyChart = async ({
  className,
}: HTMLAttributes<HTMLDivElement>) => {
  const chartData = await fetchData<ExpenseByCategoryType>({
    uri: "/api/user/expenses/by-category",
    schema: zExpenseByCategory,
  });
  if (chartData.length === 0) {
    return (
      <Typography
        variant="h3"
        color="blue-gray"
        className="flex justify-center mt-4"
      >
        記録がありません。
      </Typography>
    );
  }
  return (
    <Card className={cn(className)}>
      {/* <Typography variant="h6" color="blue-gray" className="mb-4">
        Expense share
      </Typography> */}
      <DoughnutChart data={chartData} />
    </Card>
  );
};

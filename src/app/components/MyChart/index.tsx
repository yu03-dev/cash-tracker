import { DoughnutChart } from "./elements/DoughnutChart";
import { Typography } from "@/app/common/lib/material-tailwind";
import { fetchData } from "@/app/store/api/server/fetchData";
import { ChartDataType, zChartData } from "@/types";

export const MyChart = async () => {
  const chartData = await fetchData<ChartDataType>({
    uri: "/api/user/expenses/by-category",
    schema: zChartData,
  });
  const { expensesTotal, categories, expenses } = chartData;
  if (categories.length === 0 && expenses.length === 0) {
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
    <DoughnutChart
      expensesTotal={expensesTotal}
      categories={categories}
      expenses={expenses}
    />
  );
};

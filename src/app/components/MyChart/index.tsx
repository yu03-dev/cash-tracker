import { DoughnutChart } from "./elements/DoughnutChart";
import { getChartData } from "@/utils/fetchUtils";
import { Typography } from "@/app/components/material-tailwind-wrapper";

export const MyChart = async () => {
  const chartData = await getChartData();
  if (!chartData) return <div>Errorが発生しました</div>;
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

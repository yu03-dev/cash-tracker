import { DoughnutChart } from "./elements/DoughnutChart";
import { getChartData } from "@/utils/fetchUtils";

export const MyChart = async () => {
  const chartData = await getChartData();
  if (!chartData) return <div>Error</div>;
  const { expensesTotal, categories, expenses } = chartData;
  return (
    <DoughnutChart
      expensesTotal={expensesTotal}
      categories={categories}
      expenses={expenses}
    />
  );
};

import { DoughnutChart } from "./elements/DoughnutChart";
import { getChartData } from "@/utils/fetchUtils";

export const MyChart = async () => {
  const { expensesTotal, category, expenses } = await getChartData();

  return (
    <DoughnutChart
      total={expensesTotal}
      category={category}
      expenses={expenses}
    />
  );
};

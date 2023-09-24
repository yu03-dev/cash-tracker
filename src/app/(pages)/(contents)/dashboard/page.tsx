import { fetchData } from "@/utils/fetchData";
import { Chart } from "./components/Chart";
import { ExpensesCard } from "./components/ExpensesCard";
import { RecordList } from "./components/RecordList";
import { ExpenseByCategoryType, zExpenseByCategory } from "@/types";

export default async function Page() {
  const chartData = await fetchData<ExpenseByCategoryType>({
    uri: "/api/user/expenses/by-category",
    schema: zExpenseByCategory,
  });
  return (
    <div className="w-full h-full flex flex-col gap-y-6 items-center px-1 py-4 sm:px-4 md:px-8 lg:px-12">
      <div className="w-full flex flex-col gap-4 md:flex-row md:justify-center">
        <ExpensesCard className="w-full md:w-96 p-6" />
        <Chart chartData={chartData} className="w-full md:w-96 p-6" />
      </div>
      <RecordList className="w-full overflow-y-scroll" />
    </div>
  );
}

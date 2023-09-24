import { fetchData } from "@/utils/fetchData";
import { Chart } from "./components/Chart";
import { ExpensesList } from "./components/ExpensesList";
import { RecordList } from "./components/RecordList";
import {
  ExpenseByCategoryType,
  RecordsType,
  zExpenseByCategory,
  zRecords,
} from "@/types";
import { Empty } from "@/app/components/Empty";

export default async function Page() {
  const expensesDataPromise = fetchData<ExpenseByCategoryType>({
    uri: "/api/user/expenses/by-category",
    schema: zExpenseByCategory,
  });
  const recordsPromise = fetchData<RecordsType>({
    uri: "/api/user/records",
    schema: zRecords,
  });

  const [expensesData, records] = await Promise.all([
    expensesDataPromise,
    recordsPromise,
  ]);

  if (records.length === 0) {
    return (
      <div className="w-full h-full flex flex-col gap-y-6 items-center px-1 py-4 sm:px-4 md:px-8 lg:px-12">
        <Empty />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-y-6 items-center px-1 py-4 sm:px-4 md:px-8 lg:px-12">
      <div className="w-full flex flex-col gap-4 md:flex-row md:justify-center">
        <ExpensesList
          expenseByCategory={expensesData}
          className="w-full md:w-96 p-6"
        />
        <Chart chartData={expensesData} className="w-full md:w-96 p-6" />
      </div>
      <RecordList records={records} className="w-full overflow-y-scroll" />
    </div>
  );
}

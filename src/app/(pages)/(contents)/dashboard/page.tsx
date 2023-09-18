import { MyChart } from "./components/Chart";
import { ExpensesCard } from "./components/ExpensesCard";
import { RecordList } from "./components/RecordList";

export default async function Page() {
  return (
    <div className="w-full h-full flex flex-col gap-y-6 items-center px-1 py-4 sm:px-4 md:px-8 lg:px-12">
      <div className="w-full flex flex-col gap-4 md:flex-row md:justify-center">
        <ExpensesCard className="w-full md:w-96 p-6" />
        <MyChart className="w-full md:w-96 p-6" />
      </div>
      <RecordList className="w-full overflow-y-scroll" />
    </div>
  );
}

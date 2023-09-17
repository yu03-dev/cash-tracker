import { ExpensesCard } from "./components/ExpensesCard";
import { RecordList } from "./components/RecordList";

export default async function Page() {
  return (
    <div className="w-full h-full flex flex-col gap-y-6 items-center px-1 py-4 sm:px-4 md:px-8 lg:px-12">
      <ExpensesCard />
      <RecordList />
    </div>
  );
}

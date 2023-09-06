import { ExpensesCard } from "@/app/components/ExpensesCard";
import { RecordList } from "@/app/components/RecordList";

export default async function Page() {
  return (
    <div className="flex flex-col gap-y-5">
      <div className="w-full mx-auto max-w-screen-md mt-5 sm:py-2 sm:px-4 lg:px-8 lg:py-4">
        <ExpensesCard />
      </div>
      <div className="w-full mx-auto max-w-screen-xl sm:py-2 sm:px-4 lg:px-8 lg:py-4">
        <RecordList />
      </div>
    </div>
  );
}

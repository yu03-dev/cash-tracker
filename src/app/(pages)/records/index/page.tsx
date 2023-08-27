import { TotalExpenses } from "@/app/components/ExpensesCard";
import { RecordList } from "@/app/components/RecordList";

export default async function Page() {
  return (
    <div>
      <div className="flex justify-center pt-5">
        <TotalExpenses />
      </div>
      <div className="pt-5">
        <div className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4">
          <RecordList />
        </div>
      </div>
    </div>
  );
}

import { MyChart } from "@/app/components/MyChart";
import { ProfileCard } from "@/app/components/ProfileCard";
import { TotalExpenses } from "@/app/components/ExpensesCard";

export default function Page() {
  return (
    <div className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4">
      <div className="flex">
        <div className="w-1/3 flex flex-col">
          <ProfileCard />
          <TotalExpenses />
        </div>
        <div className="w-2/3 flex justify-end">
          <div className="w-3/4">
            <MyChart />
          </div>
        </div>
      </div>
    </div>
  );
}

import { ExpensesCard } from "@/app/(pages)/records/components/ExpensesCard";
import { RecordList } from "@/app/(pages)/records/components/RecordList";
import { FlexContainer } from "@/app/common/components/FlexContainer";

export default async function Page() {
  return (
    <FlexContainer>
      <ExpensesCard />
      <div className="w-full mx-auto max-w-screen-xl sm:py-2 sm:px-4 lg:px-8 lg:py-4">
        <RecordList />
      </div>
    </FlexContainer>
  );
}

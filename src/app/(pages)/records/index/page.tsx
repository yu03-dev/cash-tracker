import { RecordList } from "@/app/components/RecordList";
import { getRecordsData } from "@/utils/fetchUtils";

export default async function Page() {
  const records = await getRecordsData();
  if (!records) return <div>Error</div>;
  return (
    <div>
      <div className="pt-10">
        <div className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4">
          <RecordList records={records} />
        </div>
      </div>
    </div>
  );
}

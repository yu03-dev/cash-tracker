import { Record } from "./elements/Record";
import { Card, Typography } from "@/app/common/lib/material-tailwind";
import { fetchData } from "@/app/store/api/server/fetchData";
import { RecordsType, zRecords } from "@/types";

const TABLE_HEAD = ["Date", "Price", "Category", ""];

export const RecordList = async () => {
  const records = await fetchData<RecordsType>({
    uri: "/api/user/records",
    schema: zRecords,
  });
  if (records.length === 0)
    return (
      <Typography
        variant="h3"
        color="blue-gray"
        className="flex justify-center"
      >
        記録がありません。
      </Typography>
    );
  return (
    <Card className="w-full h-full overflow-y-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => {
              return (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => {
            const isLast = index === records.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return <Record key={record.id} record={record} classes={classes} />;
          })}
        </tbody>
      </table>
    </Card>
  );
};

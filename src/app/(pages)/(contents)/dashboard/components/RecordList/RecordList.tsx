import cn from "@/app/common/lib/cn";
import { Record } from "./Record";
import { Card, Typography } from "@/app/common/lib/material-tailwind";
import { fetchData } from "@/utils/fetchData";
import { RecordsType, zRecords } from "@/types";
import { HTMLAttributes } from "react";

const TABLE_HEAD = ["Date", "Price", "Category", ""];

export const RecordList = async ({
  className,
}: HTMLAttributes<HTMLDivElement>) => {
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
    <Card className={cn(className)}>
      <table className="w-full min-w-max table-auto text-left">
        <thead className="sticky top-0">
          <tr>
            {TABLE_HEAD.map((head, index) => {
              return (
                <th
                  key={index}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    color="blue-gray"
                    className="font-bold leading-none opacity-70"
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
            const classes = isLast ? "p-3" : "p-3 border-b border-blue-gray-50";

            return <Record key={record.id} record={record} classes={classes} />;
          })}
        </tbody>
      </table>
    </Card>
  );
};

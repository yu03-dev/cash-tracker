import cn from "@/app/lib/cn";
import { RecordRow } from "./RecordRow";
import { Card, Typography } from "@/app/lib/material-tailwind";
import { RecordsType } from "@/types";

const TABLE_HEAD = ["Date", "Price", "Category", ""];

type RecordListProps = {
  records: RecordsType;
  className: string | undefined;
};

export const RecordList = async (props: RecordListProps) => {
  const { records, className } = props;

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

            return (
              <RecordRow key={record.id} record={record} classes={classes} />
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};

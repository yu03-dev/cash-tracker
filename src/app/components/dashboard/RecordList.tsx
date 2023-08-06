import { RecordAction, RecordType } from "@/app/types";
import React from "react";
import { Record } from "./Record";
import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Date", "Amount", "Purpose", "Button1", "Button2"];

export const RecordList = ({
  records,
  actions,
}: {
  records: RecordType[];
  actions: RecordAction;
}) => {
  return (
    <Card className="w-full h-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
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
            ))}
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => {
            const isLast = index === records.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <Record
                key={record.id}
                record={record}
                actions={actions}
                classes={classes}
              />
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};

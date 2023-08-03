import { RecordAction, RecordType } from "@/app/types";
import React from "react";
import { Record } from "./Record";

export const RecordList = ({
  records,
  actions,
}: {
  records: RecordType[];
  actions: RecordAction;
}) => {
  return (
    <div>
      {records.map((record) => {
        return (
          <div key={record.id}>
            <Record record={record} actions={actions} />
          </div>
        );
      })}
    </div>
  );
};

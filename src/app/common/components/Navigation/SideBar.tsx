"use client";
import { Card, Typography } from "@/app/common/lib/material-tailwind";
import { NavigationItemList } from "./NavigationItemList";
import clsx from "clsx";

export const DefaultSidebar = (props: { show: "sm" | "md" | "lg" }) => {
  const rootClassName = clsx(
    "h-full w-64 p-4",
    "sticky",
    "shadow-xl",
    `hidden ${props.show}:block`
  );
  return (
    <Card className={rootClassName}>
      <div className="mb-2 p-4">
        <Typography variant="h4" color="blue-gray">
          CashTracker
        </Typography>
      </div>
      <NavigationItemList />
    </Card>
  );
};

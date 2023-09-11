"use client";
import { Card, Typography } from "@/app/common/lib/material-tailwind";
import { NavigationItemList } from "./NavigationItemList";
import cn from "../../lib/cn";

type DefaultSidebarProps = React.HTMLAttributes<HTMLDivElement>;

export const DefaultSidebar = ({ className }: DefaultSidebarProps) => {
  return (
    <Card className={cn("h-full w-64 p-4", "sticky", "shadow-xl", className)}>
      <div className="mb-2 p-4">
        <Typography variant="h4" color="blue-gray">
          CashTracker
        </Typography>
      </div>
      <NavigationItemList />
    </Card>
  );
};

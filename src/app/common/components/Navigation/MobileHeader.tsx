"use client";
import { useEffect, useState } from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Drawer,
} from "@/app/common/lib/material-tailwind";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { NavigationItemList } from "./NavigationItemList";
import cn from "../../lib/cn";

type MobileHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export const MobileHeader = ({ className }: MobileHeaderProps) => {
  const [isShowDrawer, setIsShowDrawer] = useState(false);

  const openDrawer = () => setIsShowDrawer(true);
  const closeDrawer = () => setIsShowDrawer(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth >= 960 && setIsShowDrawer(false);
    });
  }, []);

  return (
    <>
      <Navbar
        className={cn(
          "sticky top-0 z-10",
          "h-max max-w-full py-2 px-4 lg:px-8 lg:py-4",
          "rounded-none",
          className
        )}
      >
        <IconButton
          variant="text"
          onClick={openDrawer}
          className="ml-auto hover:bg-gray-300"
        >
          <Bars3Icon className="h-6 w-6" />
        </IconButton>
      </Navbar>
      <Drawer open={isShowDrawer} onClose={closeDrawer} onClick={closeDrawer}>
        <div className="mb-2 flex items-center justify-between p-4">
          <Typography variant="h4" color="blue-gray">
            Cash Tracker
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={closeDrawer}
            className="hover:bg-gray-300"
          >
            <XMarkIcon className="h-6 w-6" />
          </IconButton>
        </div>
        <NavigationItemList />
      </Drawer>
    </>
  );
};

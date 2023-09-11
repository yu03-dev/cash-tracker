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
import clsx from "clsx";

export const MobileHeader = (props: { hidden?: "sm" | "md" | "lg" }) => {
  const [isShowDrawer, setIsShowDrawer] = useState(false);

  const openDrawer = () => setIsShowDrawer(true);
  const closeDrawer = () => setIsShowDrawer(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth >= 960 && setIsShowDrawer(false);
    });
  }, []);

  const rootClassName = clsx(
    "sticky top-0 z-10",
    "h-max max-w-full py-2 px-4 lg:px-8 lg:py-4",
    "rounded-none",
    props.hidden ? `${props.hidden}:hidden` : ""
  );

  return (
    <>
      <Navbar className={rootClassName}>
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

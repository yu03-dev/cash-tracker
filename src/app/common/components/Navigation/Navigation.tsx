"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/hooks/useAuth";
import {
  Card,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@/app/common/lib/material-tailwind";
import {
  PresentationChartBarIcon,
  ArrowLeftOnRectangleIcon,
  ChartPieIcon,
  PlusCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

const NavigationItemList = () => {
  const { logout } = useAuth();

  const navItems = [
    {
      title: "Record",
      href: "/records",
      element: <PresentationChartBarIcon className="h-5 w-5" />,
    },
    {
      title: "Add",
      href: "/records/add",
      element: <PlusCircleIcon className="h-5 w-5" />,
    },
    {
      title: "Chart",
      href: "/chart",
      element: <ChartPieIcon className="h-5 w-5" />,
    },
    {
      title: "Log out",
      href: "/",
      element: <ArrowLeftOnRectangleIcon className="h-5 w-5" />,
      onClick: () => logout(),
    },
  ];

  return (
    <List>
      {navItems.map(({ title, element, href, onClick }, index) => {
        return (
          <Link href={href} onClick={onClick} key={index}>
            <ListItem className="hover:bg-gray-300">
              <ListItemPrefix>{element}</ListItemPrefix>
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-normal"
              >
                {title}
              </Typography>
            </ListItem>
          </Link>
        );
      })}
    </List>
  );
};

// 768pxより大きいとき display: block
export const Sidebar = () => {
  return (
    <Card className="h-full w-80 p-4 shadow-none bg-gray-100 hidden md:block">
      <NavigationItemList />
    </Card>
  );
};

// 768pxより大きいとき display: none
export const NavigationHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);
  return (
    <div className="px-4 py-4 flex gap-10 items-center border-b border-gray-200 md:hidden">
      <Bars3Icon className="h-6 w-6 cursor-pointer" onClick={openDrawer} />
      <Drawer open={isOpen} onClose={closeDrawer} className="p-4">
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Material Tailwind
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <XMarkIcon className="h-6 w-6" />
          </IconButton>
        </div>
        <NavigationItemList />
      </Drawer>
      <Typography color="blue-gray">Records</Typography>
    </div>
  );
};

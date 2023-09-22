"use client";
import React, { useCallback, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/hooks/useAuth";
import {
  Avatar,
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
  PlusCircleIcon,
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { useGetProfile } from "@/app/hooks/useGetProfile";
import { useMutateSnackbar } from "@/app/hooks/useMutateSnackbar";
import { useRouter } from "next/navigation";

const NavigationItemList = () => {
  const router = useRouter();
  const { isLoading, logout } = useAuth();
  const { name, picture, email } = useGetProfile();

  const handleLogout = useCallback(async () => {
    await logout();
    router.push("/");
  }, [logout, router]);

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      element: <PresentationChartBarIcon className="h-5 w-5" />,
    },
    {
      title: "Add",
      href: "/add",
      element: <PlusCircleIcon className="h-5 w-5" />,
    },
  ];

  useMutateSnackbar({
    loadingText: "ログアウトしています",
    completeText: "ログアウトしました",
    loading: isLoading,
  });

  return (
    <>
      <div className="flex gap-4 items-center mb-4">
        {picture ? (
          <Avatar src={picture} alt="avatar" />
        ) : (
          <UserCircleIcon className="h-12 w-12" />
        )}

        <div>
          <Typography variant="h5" color="blue-gray">
            {name || "NoName"}
          </Typography>
          <Typography variant="small" color="gray">
            {email || ""}
          </Typography>
        </div>
      </div>
      <List>
        {navItems.map(({ title, element, href }, index) => {
          return (
            <Link href={href} key={index}>
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
        <ListItem className="hover:bg-gray-300" onClick={handleLogout}>
          <ListItemPrefix>
            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Typography variant="h5" color="blue-gray" className="font-normal">
            Log out
          </Typography>
        </ListItem>
      </List>
    </>
  );
};

// 768pxより大きいとき display: block
export const Sidebar = () => {
  return (
    <Card className="h-full w-96 px-4 py-8 shadow-none bg-gray-100 hidden md:block">
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
            CashTracker
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

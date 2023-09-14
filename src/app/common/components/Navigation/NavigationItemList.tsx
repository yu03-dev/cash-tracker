import React from "react";
import {
  PresentationChartBarIcon,
  ArrowLeftOnRectangleIcon,
  ChartPieIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { useAuth } from "@/app/hooks/useAuth";
import {
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@/app/common/lib/material-tailwind";
import Link from "next/link";

type NavType = {
  title: string;
  href: string;
  element: React.JSX.Element;
  onClick?: () => void;
};

export const NavigationItemList = () => {
  const { logout } = useAuth();

  const navItems: NavType[] = [
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

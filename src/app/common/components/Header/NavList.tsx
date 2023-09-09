import { Typography } from "@/app/common/lib/material-tailwind";
import Link from "next/link";

type NavItemType = {
  title: string;
  href: string;
};

const navItems: NavItemType[] = [
  { title: "Home", href: "/" },
  { title: "Records", href: "/records" },
  { title: "Add", href: "/records/add" },
  { title: "Chart", href: "/chart" },
];

export const NavList = ({ onClick }: { onClick?: () => void }) => {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {navItems.map((item, index) => (
        <Typography
          key={index}
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <Link
            href={item.href}
            onClick={onClick}
            className="flex items-center"
          >
            {item.title}
          </Link>
        </Typography>
      ))}
    </ul>
  );
};

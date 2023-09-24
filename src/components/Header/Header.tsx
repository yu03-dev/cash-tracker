import { Typography } from "@/lib/material-tailwind";
import { CurrencyYenIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <header className="px-4 py-4 w-full flex justify-between items-center border-b border-gray-200">
      <div className="flex items-center gap-1">
        <CurrencyYenIcon className="h-6 w-6" />
        <Typography variant="h6" color="blue-gray" className="lg:text-lg">
          CashTracker
        </Typography>
      </div>
      <div className="flex items-center gap-5 lg:gap-10">
        <Link href="https://portfolio-web-site-neon.vercel.app">
          <Typography color="blue-gray" className="text-sm lg:text-base">
            My Portfolio
          </Typography>
        </Link>
        <Link href="https://github.com/yu03-dev/cash-tracker">
          <Image
            src="/github-mark.png"
            alt="Repository"
            height={24}
            width={24}
          />
        </Link>
      </div>
    </header>
  );
};

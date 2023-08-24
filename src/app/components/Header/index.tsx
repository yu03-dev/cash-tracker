"use client";
import React from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Collapse,
  Button,
} from "@material-tailwind/react";
import { HamburgerMenu } from "./elements/HamburgerMenu";
import { CloseButton } from "./elements/CloseButton";
import { NavList } from "./elements/NavList";
import { useHeader } from "@/app/hooks/useHeader";
import { useAuth } from "@/app/hooks/useAuth";

export function Header() {
  const { openNav, handleNav } = useHeader();
  const { handleSignOut } = useAuth();

  return (
    <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4 mt-2 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          Cash Tracker
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <Button
          variant="gradient"
          size="sm"
          className="hidden lg:inline-block"
          onClick={handleSignOut}
        >
          SignOut
        </Button>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={handleNav}
        >
          {openNav ? <CloseButton /> : <HamburgerMenu />}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">
          <NavList />
          <Button
            variant="gradient"
            size="sm"
            className="mb-2"
            onClick={handleSignOut}
          >
            SignOut
          </Button>
        </div>
      </Collapse>
    </Navbar>
  );
}

"use client";
import { Button, Typography } from "@/app/common/lib/material-tailwind";
import { useAuth } from "../hooks/useAuth";
import { MobileHeader } from "../common/components/Navigation/MobileHeader";

export default function Home() {
  const { handleSignIn } = useAuth();

  return (
    <div className="w-full h-full flex flex-col">
      <MobileHeader />
      <div
        style={{ backgroundImage: "url('Home.jpg')" }}
        className="w-full h-full bg-cover flex flex-col gap-y-6 items-center justify-center px-1 py-8 sm:px-4 md:px-8 md:py-12 lg:px-12"
      >
        <Typography color="blue-gray" variant="h1">
          Cash Tracker
        </Typography>
        <Button onClick={handleSignIn}>Sign in with Google</Button>
      </div>
    </div>
  );
}

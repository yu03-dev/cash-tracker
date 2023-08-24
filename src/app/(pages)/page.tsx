"use client";
import { Button } from "@material-tailwind/react";
import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const { handleSignIn } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[url('/Home.jpg')] bg-cover">
      <h1 className="text-4xl">Cash Tracker</h1>
      <Button onClick={handleSignIn}>Sign in with Google</Button>
    </div>
  );
}

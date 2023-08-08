"use client";
import { SignInButton } from "@/app/components/SignInButton";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[url('/Home.jpg')] bg-cover">
      <h1 className="text-4xl">Cash Tracker</h1>
      <SignInButton />
    </div>
  );
}

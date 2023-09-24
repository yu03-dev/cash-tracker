import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "../components/Header";
import cn from "../lib/cn";
import { Snackbar } from "../components/Snackbar/Snackbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cash Tracker",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={cn(inter.className, "h-screen")}>
        <Header />
        {children}
        <Snackbar />
      </body>
    </html>
  );
}

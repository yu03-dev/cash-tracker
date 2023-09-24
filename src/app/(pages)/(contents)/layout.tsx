import { Sidebar, NavigationHeader } from "@/components/Navigation";

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full md:flex-row md:h-full">
      <Sidebar />
      <NavigationHeader />
      {children}
    </div>
  );
}

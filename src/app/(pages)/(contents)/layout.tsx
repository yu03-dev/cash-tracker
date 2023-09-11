import { MobileHeader } from "@/app/common/components/Navigation/MobileHeader";
import { DefaultSidebar } from "@/app/common/components/Navigation/SideBar";

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row h-full w-full">
      <div className="w-full h-fit lg:w-fit lg:h-full">
        <MobileHeader hidden="lg" />
        <DefaultSidebar show="lg" />
      </div>
      {children}
    </div>
  );
}

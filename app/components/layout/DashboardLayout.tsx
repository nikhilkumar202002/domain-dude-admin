import type { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="h-screen overflow-hidden bg-slate-50">
      <Sidebar />
      <div className="flex h-screen min-w-0 flex-col lg:ml-68">
        <Header />
        <main className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;

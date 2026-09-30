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
      <div className="ml-68 flex h-screen min-w-0 flex-col">
        <Header />
        <main className="min-h-0 flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;

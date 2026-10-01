"use client";

import { useState, useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { getStoredToken } from "../../utils/auth";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = getStoredToken();
    if (!token && pathname !== "/login") {
      router.push("/login");
    } else if (token && pathname === "/login") {
      router.push("/");
    }
    setIsCheckingAuth(false);
  }, [pathname, router]);

  if (pathname === "/login") return <>{children}</>;

  if (isCheckingAuth) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-slate-50">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex h-screen min-w-0 flex-col lg:ml-68">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;


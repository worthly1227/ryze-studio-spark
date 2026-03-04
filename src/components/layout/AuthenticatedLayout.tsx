import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ClientSidebar } from "@/components/layout/ClientSidebar";
import TopBar from "@/components/layout/TopBar";
import { Outlet } from "react-router-dom";

const AuthenticatedLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <ClientSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar />
          <main className="flex-1 p-3 sm:p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AuthenticatedLayout;

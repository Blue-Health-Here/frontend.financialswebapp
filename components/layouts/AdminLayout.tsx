import React from "react";
import Sidebar from "../common/Sidebar";
import Topbar from "../common/Topbar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-gray-100 overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 ml-[266px]  min-h-screen p-6">
        <Topbar />
        {children}
      </div>
    </div>
  );
}

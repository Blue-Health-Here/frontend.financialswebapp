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
      <div className="w-[80%] ml-[20%]  min-h-screen p-6 ">
        <Topbar />
        {children}
      </div>
    </div>
  );
}

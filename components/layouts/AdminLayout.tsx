import React from "react";
import Sidebar from "../common/Sidebar";
import Topbar from "../common/Topbar";
import { createClient } from "@/utils/supabase/server";
import { getUserRole } from "@/utils/helper";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const role = await getUserRole(user);
    if (role !== "admin") {
      redirect("/not-found");
    }
  }

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

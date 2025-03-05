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
    // const role = await getUserRole(user);
    // if (role !== "admin") {
    //   redirect("/not-found");
    // }
  }

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-x-hidden">
      <Sidebar />
      <div className="w-full">
        <div className="bg-bodyBG fixed top-0 left-[250px] xl:left-[300px] right-0 px-6 py-4 z-50">
          <Topbar />
        </div>
        <div className="ml-[250px] xl:ml-[300px] min-h-screen p-6 pt-[6.7rem]">
          {children}
        </div>
      </div>
    </div>
  );
}

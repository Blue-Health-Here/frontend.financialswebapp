import React from "react";
import Sidebar from "../common/Sidebar";
import Topbar from "../common/Topbar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getUserRole } from "@/lib/getUserRole";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { session }, error } = await supabase.auth.getSession();
  const { data, error: errUser } = await supabase.auth.getUser();
  // console.log(data, errUser, "dpasoidpoasd")
  const role = await getUserRole(session?.user);
  if (role !== "admin" && data?.user) {
    redirect("/not-found");
  }

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-x-hidden">
      <Sidebar role={role} />
      <div className="w-full">
        <Topbar role={role} session={session} />
        <div className="ml-auto lg:ml-[250px] xl:ml-[300px] min-h-screen p-6 pt-[6.7rem]">
          {children}
        </div>
      </div>
    </div>
  );
}

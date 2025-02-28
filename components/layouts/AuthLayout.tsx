import { getUserRole } from "@/utils/helper";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function AuthLayout({
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
    if (role === "admin") {
      redirect("/admin/dashboard");
    } else if (role === "pharmacy") {
      redirect("/pharmacy/dashboard");
    }
  }

  return (
    <div>
      {children}
    </div>
  );
}

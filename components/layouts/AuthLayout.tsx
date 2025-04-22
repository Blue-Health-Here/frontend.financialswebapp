import { getUserRole } from "@/lib/getUserRole";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { session }, error } = await supabase.auth.getSession();

  if (session && !error) {
    const role = await getUserRole(session?.user);
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

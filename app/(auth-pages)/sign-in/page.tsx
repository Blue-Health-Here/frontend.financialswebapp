import { Metadata } from "next";
import Link from "next/link";
import AuthBackgroundImage from "@/components/common/AuthBackgroundImage";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign In - Financials Web App",
};

export default async function Login() {
  return (
    <div className="flex h-screen">
      <AuthBackgroundImage />
      <div className="flex-[1] p-10 md:p-20 flex flex-col h-full justify-between min-h-screen">
        <h1 className="text-center font-bold">LOGO</h1>
        <div className="flex flex-col">
          <h1>
            Welcome to Vuexy! 👋🏻
          </h1>
          <p className="text-grey">Please sign-in to your account</p>
          <LoginForm />
        </div>
        <p className="text-center text-grey">
          New on our platform? <Link href="/sign-up" className="text-black text-sm font-semibold">Register Account</Link>
        </p>
      </div>
    </div>
  );
}

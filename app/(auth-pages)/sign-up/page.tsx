import { FormMessage, Message } from "@/components/form-message";
import Link from "next/link";
import AuthBackgroundImage from "@/components/common/AuthBackgroundImage";
import { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Sign Up - Financials Web App",
};
export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
      <div className="flex min-h-screen">
        <AuthBackgroundImage />
        <div className="flex-[1] p-10 md:p-20 flex flex-col h-full justify-between min-h-screen">
          <h1 className="text-center font-bold">LOGO</h1>
          <div className="flex flex-col py-10">
            <h1 className="font-normal">
              Register Account 😍
            </h1>
            <p className="text-grey">Register your account today.</p>
            <RegisterForm message={searchParams} />
          </div>
          <p className="text-center text-grey">
            Already have an account? <Link href="/sign-in" className="text-black text-sm">Sign in</Link>
          </p>
        </div>
      </div>
    </>
  );
}

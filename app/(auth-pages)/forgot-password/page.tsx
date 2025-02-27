import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import Image from "next/image";
import backArrow from "../../../public/backArrow.svg"
import AuthBackgroundImage from "@/components/common/AuthBackgroundImage";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Forgot Password - Financials Web App",
};
export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <>
      <div className="flex h-screen">
        <AuthBackgroundImage />
        <div className="flex-[1] p-10 md:p-20 flex flex-col h-full min-h-screen">
          <h1 className="text-center font-bold">LOGO</h1>
          <div className="flex flex-col h-full justify-center">
            <div className="">
              <h1 className="font-normal">
                Forgot Password? 🔑
              </h1>
              <p className="text-[grey]">Enter your email and we'll send you the link to reset your password.</p>
            </div>
            <form className="flex flex-col min-w-64 gap-y-6">
              <div className="flex flex-col text-[grey] gap-2 [&>input]:mb-3 mt-8 [&>input]:placeholder:text-[#B9B9C3] [&>input]:placeholder:text-[12px] ">
                <Label size="xs" htmlFor="email">Email</Label>
                <Input name="email" placeholder="you@example.com" required />
                <SubmitButton className="mb-3 text-white" pendingText="Signing In..." formAction={forgotPasswordAction}>
                  Send reset link
                </SubmitButton>
                <FormMessage message={searchParams} />
                <Link className="text-[14px] text-black text-center flex gap-x-2 justify-center" href="/sign-in">
                  <Image src={backArrow} alt="" /> <p> Back to login</p>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

import { Metadata } from "next";
import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import authImage from "../../../public/auth-image.svg"
import passwordIcon from "../../../public/password.svg"
import Image from "next/image";
import AuthBackgroundImage from "@/components/common/AuthBackgroundImage";

export const metadata: Metadata = {
  title: "Sign In - Financials Web App",
};

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="flex h-screen">
      <AuthBackgroundImage />
      <div className="flex-[1] p-10 md:p-20 flex flex-col h-full justify-between min-h-screen">
        <h1 className="text-center font-bold">LOGO</h1>
        <div className="flex flex-col">
          <h1 className="text-[24px] font-normal">
            Welcome to Vuexy! 👋🏻
          </h1>
          <p className="text-grey">Please sign-in to your account</p>
          <form className="flex flex-col min-w-64 gap-y-6">
            <div className="flex flex-col text-grey text-[12px] gap-2 [&>input]:mb-3 mt-8 [&>input]:placeholder:text-[#B9B9C3] [&>input]:placeholder:text-[12px]">
              <Label size="xs" htmlFor="email">Email</Label>
              <Input name="email" placeholder="you@example.com" required />
              <div className="flex justify-between items-center">
                <Label size="xs" htmlFor="password">Password</Label>
              </div>
              <div className="relative">
                <Image src={passwordIcon} alt="password" className="absolute right-4 top-3" />
                <Input type="password" name="password" placeholder="Your password" required className="placeholder:text-[#B9B9C3] placeholder:text-[12px] mb-3" />
              </div>

              <SubmitButton className="mb-3 text-sm text-white" pendingText="Signing In..." formAction={signInAction}>
                Sign in
              </SubmitButton>
              <FormMessage message={searchParams} />
              <Link className="text-[12px] text-center text-foreground underline" href="/forgot-password">
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
        <p className="text-center text-grey">
          New on our platform? <Link href="/sign-up" className="text-black text-sm">Register Account</Link>
        </p>
      </div>
    </div>
  );
}

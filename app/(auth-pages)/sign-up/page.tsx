import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import Image from "next/image";
import authImage from "../../../public/auth-image.svg"
import passwordIcon from "../../../public/password.svg"
import AuthBackgroundImage from "@/components/common/AuthBackgroundImage";

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
            <p className="text-[grey]">Register your account today.</p>
            <form className="flex flex-col min-w-64 gap-y-6">
              <div className="flex flex-col text-[grey] gap-2 [&>input]:mb-3 mt-8 [&>input]:placeholder:text-[#B9B9C3] [&>input]:placeholder:text-[12px]">
                <Label size="xs" htmlFor="name">Full Name</Label>
                <Input name="name" placeholder="Enter your Name" required />
                <Label size="xs" htmlFor="email">Email</Label>
                <Input name="email" placeholder="you@example.com" required />
                <div className="flex justify-between items-center">
                  <Label size="xs" htmlFor="password">Password</Label>
                </div>
                <Input type="password" name="password" placeholder="Your password" required className="placeholder:text-[#B9B9C3] mb-3" />
                <div className="flex justify-between items-center">
                  <Label size="xs" htmlFor="password">Confirm Password</Label>
                </div>
                <Input type="password" name="password" placeholder="Confirm password" required className="placeholder:text-[#B9B9C3] mb-3" />
                <SubmitButton className="mb-3 text-sm text-white" pendingText="Signing In..." formAction={signUpAction}>
                  Register
                </SubmitButton>
                <FormMessage message={searchParams} />
                <Link className="text-[12px] text-center text-foreground underline" href="/forgot-password">
                  Forgot Password?
                </Link>
              </div>
            </form>
          </div>
          <p className="text-center text-[grey]">
            Already have an account? <Link href="/sign-in" className="text-black text-sm">Sign in</Link>
          </p>
        </div>
      </div>
    </>
  );
}

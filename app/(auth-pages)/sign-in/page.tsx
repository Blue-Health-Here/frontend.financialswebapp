import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import authImage from "../../../public/auth-image.svg"
import passwordIcon from "../../../public/password.svg"
import Image from "next/image";
export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="flex h-screen">
      <div className="flex-[3] bg-[#F8F8F8] justify-center items-center hidden md:flex">
        <Image src={authImage} alt="Auth Image" />
      </div>
      <div className="flex-[1] p-10 md:p-20 flex flex-col h-full justify-between">
        <h1 className="text-[24px] text-center font-bold">LOGO</h1>
        <div className="flex flex-col">
          <h2 className="text-[24px] font-normal">
            Welcome to Vuexy! 👋🏻
          </h2>
          <p className="text-[14px] text-[grey]">Please sign-in to your account</p>
          <form className="flex flex-col min-w-64 gap-y-6">
            <div className="flex flex-col text-[grey] gap-2 [&>input]:mb-3 mt-8 [&>input]:placeholder:text-[#B9B9C3]">
              <Label htmlFor="email">Email</Label>
              <Input name="email" placeholder="you@example.com" required />
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative">
                <Image src={passwordIcon} alt="password" className="absolute right-4 top-3" />
                <Input type="password" name="password" placeholder="Your password" required className="placeholder:text-[#B9B9C3] mb-3" />
              </div>

              <SubmitButton className="mb-3 text-white" pendingText="Signing In..." formAction={signInAction}>
                Sign in
              </SubmitButton>
              <FormMessage message={searchParams} />
              <Link className="text-[12px] text-center text-foreground underline" href="/forgot-password">
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
        <p className="text-center text-[grey] text-[14px]">
          New on our platform? <Link href="/forgot-password" className="text-black">Register Account</Link>
        </p>
      </div>
    </div>
  );
}

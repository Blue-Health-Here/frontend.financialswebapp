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
      <div className="flex-[3] bg-[#F8F8F8] flex justify-center items-center">
        <Image src={authImage} alt="Auth Image" />
      </div>
      <form className="flex-[1] flex flex-col min-w-64 gap-y-24 p-20">
        <h1 className="text-[24px] text-center font-bold">LOGO</h1>
        <div className="">
          <h2 className="text-[24px] font-normal">
            Welcome to Vuexy! 👋🏻</h2>
          <p className="text-[14px] text-[grey]">Please sign-in to yo</p>
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
        </div>
        <p className="text-center text-[grey] text-[14px]">New on our platform? <Link href="/forgot-password" className="text-black">Register Account</Link> </p>
      </form>
    </div>

  );
}
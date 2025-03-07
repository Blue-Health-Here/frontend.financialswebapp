import { Message } from "@/components/form-message";
import AuthBackgroundImage from "@/components/common/AuthBackgroundImage";
import { Metadata } from "next";
import ForgotPasswordForm from "@/components/auth/ForgotPassword";
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
              <h1>
                Forgot Password? 🔑
              </h1>
              <p className="text-grey">Enter your email and we'll send you the link to reset your password.</p>
            </div>
            <ForgotPasswordForm message={searchParams} />
          </div>
        </div>
      </div>
    </>
  );
}

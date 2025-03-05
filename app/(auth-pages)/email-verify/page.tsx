import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import Link from "next/link";
import AuthBackgroundImage from "@/components/common/AuthBackgroundImage";
import { Metadata } from "next";
import { IoIosArrowBack } from "react-icons/io";

export const metadata: Metadata = {
    title: "Email Verify - Financials Web App",
};
export default async function Verification(props: {
    searchParams: Promise<Message>;
}) {
    const searchParams = await props.searchParams;
    return (
        <>
            <div className="flex h-screen">
                <AuthBackgroundImage />
                <div className="flex-1 p-10 md:p-20 flex flex-col items-center min-h-screen">
                    <h1 className="text-center font-[800] justify-center">LOGO</h1>
                    <div className="flex flex-col justify-center h-full">
                        <div>
                            <h1 className="font-normal">
                                Verify your email ✉️
                            </h1>
                            <p className="text-grey">Account activation link sent to your email address. Please check your email and click on the activation link to verify your account.</p>
                        </div>
                        <form className="flex flex-col min-w-64 gap-y-6">
                            <div className="flex flex-col text-grey gap-2 [&>input]:mb-3 mt-8 [&>input]:placeholder:text-themeLight [&>input]:placeholder:text-[12px] ">
                                <SubmitButton className="mb-3 text-white" pendingText="Signing In..." formAction={forgotPasswordAction}>
                                    Okay
                                </SubmitButton>
                                <FormMessage message={searchParams} />
                                <Link className="text-[14px] text-black text-center flex gap-x-1 justify-center" href="/sign-in">
                                    <IoIosArrowBack className="w-[18px] h-[18px]" /> <p> Back to login</p>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

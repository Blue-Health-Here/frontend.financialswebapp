import { resetPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthBackgroundImage from "@/components/common/AuthBackgroundImage";
export default async function ResetPassword(props: {
    searchParams: Promise<Message>;
}) {
    const searchParams = await props.searchParams;
    return (
        <div className="flex h-screen">
            <AuthBackgroundImage />
            <div className="flex-[1] p-10 md:p-20 flex flex-col h-full gap-y-20 md:gap-y-52 min-h-screen">
                <h1 className="text-center font-bold">LOGO</h1>
                <div className="flex flex-col">
                    <h1>
                        Reset Password
                    </h1>
                    <p className="text-grey">Please enter your new password below.</p>
                    <form className="flex flex-col min-w-64 text-grey gap-2 [&>input]:mb-3 mt-8 [&>input]:placeholder:text-themeLight [&>input]:placeholder:text-[12px]">
                        <Label htmlFor="password" className="text-xs">New password</Label>
                        <Input
                            type="password"
                            name="password"
                            placeholder="New password"
                            required
                            className="placeholder:text-themeLight"

                        />
                        <Label htmlFor="confirmPassword" className="text-xs">Confirm password</Label>
                        <Input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            required
                            className="placeholder:text-themeLight"

                        />
                        <SubmitButton
                            className="my-3 text-sm text-white w-full"

                            formAction={resetPasswordAction}>
                            Reset password
                        </SubmitButton>
                        <FormMessage message={searchParams} />
                    </form>
                </div>
            </div>
        </div>
    );
}

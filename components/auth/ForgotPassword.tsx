"use client"
import React from "react";
import { Formik, Form } from "formik";
import InputField from "../common/form/InputField";
import { FormMessage } from "../form-message";
import { SubmitButton } from "../submit-button";
import { forgotPassInitialVals } from "@/utils/initialVals";
import { forgotPasswordAction } from "@/app/actions";
import { forgotPassValidationSchema } from "@/utils/validationSchema";
import Link from "next/link";
import Image from "next/image";

const ForgotPasswordForm: React.FC<any> = ({ message }) => {
    const handleSubmit = (values: typeof forgotPassInitialVals) => {
        console.log("Form submitted:", values);
        const formData = new FormData();
        formData.append("email", values.email);
        forgotPasswordAction(formData);
    };

    return (
        <Formik
            initialValues={forgotPassInitialVals}
            validationSchema={forgotPassValidationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="flex flex-col min-w-64 text-grey gap-2 [&>input]:mb-3 mt-8 [&>input]:placeholder:text-themeLight [&>input]:placeholder:text-[12px]">
                    <InputField label="Email" className="placeholder:text-themeLight" name="email" type="email" placeholder="Your Email" />
                    <SubmitButton type="submit" className="my-3 text-sm text-white w-full" disabled={isSubmitting} pendingText="Sending...">
                        {isSubmitting ? "Sending..." : "Send reset link"}
                    </SubmitButton>

                    <FormMessage message={message} />
                    <Link className="text-[14px] text-black text-center flex gap-x-2 justify-center font-semibold" href="/sign-in">
                        <Image src="/backArrow.svg" alt="" loading="lazy" width={20} height={10} /> <p> Back to login</p>
                    </Link>
                </Form>
            )}
        </Formik>
    );
};

export default ForgotPasswordForm;

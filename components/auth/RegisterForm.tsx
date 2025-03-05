"use client"
import React from "react";
import { Formik, Form } from "formik";
import { signUpValidationSchema } from "@/utils/validationSchema";
import InputField from "../common/form/InputField";
import { FormMessage } from "../form-message";
import { SubmitButton } from "../submit-button";
import { signUpInitialVals } from "@/utils/initialVals";
import { signUpAction } from "@/app/actions";

const RegisterForm: React.FC<any> = ({ message }) => {
    const handleSubmit = (values: typeof signUpInitialVals) => {
        console.log("Form submitted:", values);
        const formData = new FormData();
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("name", values.name);
        signUpAction(formData);
    };

    return (
        <Formik
            initialValues={signUpInitialVals}
            validationSchema={signUpValidationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="flex flex-col min-w-64 text-grey gap-2 [&>input]:mb-3 mt-8 [&>input]:placeholder:text-themeLight [&>input]:placeholder:text-[12px]">
                    <InputField label="Full Name" className="placeholder:text-themeLight" name="name" placeholder="Your Full Name" />
                    <InputField label="Email" className="placeholder:text-themeLight" name="email" type="email" placeholder="Your Email" />
                    <InputField label="Password" className="placeholder:text-themeLight" name="password" type="password" placeholder="Your password" />
                    <InputField label="Confirm Password" className="placeholder:text-themeLight" name="confirmPassword" type="password" placeholder="Confirm Password" />

                    <SubmitButton type="submit" className="my-3 text-sm text-white w-full" disabled={isSubmitting} pendingText="Signing Up...">
                        {isSubmitting ? "Signing Up..." : "Sign Up"}
                    </SubmitButton>
                    
                    <FormMessage message={message} />
                </Form>
            )}
        </Formik>
    );
};

export default RegisterForm;

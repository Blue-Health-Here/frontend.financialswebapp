"use client";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import InputField from "../common/form/InputField";
import { FormMessage } from "../form-message";
import { SubmitButton } from "../submit-button";
import { signInInitialVals } from "@/utils/initialVals";
import { signInAction } from "@/app/actions";
import { signInValidationSchema } from "@/utils/validationSchema";
import Link from "next/link";
import { FiEye, FiEyeOff  } from "react-icons/fi";

const LoginForm: React.FC<any> = ({ message }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (values: typeof signInInitialVals) => {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    signInAction(formData);
  };

  return (
    <Formik
      initialValues={signInInitialVals}
      validationSchema={signInValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col min-w-64 text-grey gap-2 [&>input]:mb-3 mt-8 [&>input]:placeholder:text-themeLight [&>input]:placeholder:text-[12px]">
          <InputField
            label="Email"
            className="placeholder:text-themeLight"
            name="email"
            type="email"
            placeholder="Your Email"
          />
          <InputField
            label="Password"
            className="placeholder:text-themeLight"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Your password"
            Icon={showPassword ? FiEyeOff  : FiEye}
            onIconClick={() => setShowPassword(!showPassword)}
          />
          <SubmitButton
            type="submit"
            className="my-3 text-sm text-white w-full"
            disabled={isSubmitting}
            pendingText="Signing In..."
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </SubmitButton>
          <FormMessage message={message} />

          <Link
            className="text-sm text-center text-foreground underline"
            href="/forgot-password"
          >
            Forgot Password?
          </Link>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;

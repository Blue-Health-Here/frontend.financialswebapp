import * as Yup from "yup";

export const signUpValidationSchema = Yup.object({
    name: Yup.string().min(3, "Too short").required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
});

export const signInValidationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

export const forgotPassValidationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required")
});

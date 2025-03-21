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

export const addNewCourseValidationSchema = Yup.object().shape({
    title: Yup.string().required("Course title is required"),
    description: Yup.string().required("Course description is required"),
    pharmacy_ids: Yup.array()
        .min(1, "At least one pharmacy must be selected")
        .required("Pharmacy selection is required"),
    uploadType: Yup.number()
        .oneOf([1, 2], "Please select either Link or Upload File")
        .default(1)
        .required("Upload type is required"),
    link: Yup.string().nullable().when("uploadType", ([uploadType]: any, schema) =>
        Number(uploadType) === 1
            ? schema.required("Link is required").url("Enter a valid URL")
            : schema.notRequired().nullable()
    ),
    file: Yup.mixed<File>().nullable().when("uploadType", ([uploadType]: any, schema) =>
        Number(uploadType) === 2
            ? schema.required("File is required")
            : schema.notRequired().nullable()
    ),
});
export const addNewMarketingMaterialsValidationSchema = Yup.object().shape({
    title: Yup.string().required("Marketing Materials title is required"),
    description: Yup.string().required("Marketing Materials description is required"),
    pharmacy_ids: Yup.array()
        .min(1, "At least one pharmacy must be selected")
        .required("Pharmacy selection is required"),
    uploadType: Yup.number()
        .oneOf([1, 2], "Please select either Link or Upload File")
        .default(1)
        .required("Upload type is required"),
    link: Yup.string().nullable().when("uploadType", ([uploadType]: any, schema) =>
        Number(uploadType) === 1
            ? schema.required("Link is required").url("Enter a valid URL")
            : schema.notRequired().nullable()
    ),
    file: Yup.mixed<File>().nullable().when("uploadType", ([uploadType]: any, schema) =>
        Number(uploadType) === 2
            ? schema.required("File is required")
            : schema.notRequired().nullable()
    ),
});
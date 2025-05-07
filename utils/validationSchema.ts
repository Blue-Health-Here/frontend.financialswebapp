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

export const addNewCategoryValidationSchema = Yup.object().shape({
    name: Yup.string().required("Category Name is required"),
});


export const addNewPharmacyExpenseValidationSchema = Yup.object().shape({
    title: Yup.string().required("Expense title is required"),
    amount: Yup.number().typeError("Expense amount must be a number").required("Expense amount is required"),
    expense_date: Yup.string().required("Date is required"),
    category_id: Yup.string().required("Expense category selection is required"),
    revenue: Yup.number().typeError("Revenue must be a number").required("Revenue is required"),
});

export const addNewPaymentReconciliationInitialchema = Yup.object({
    file_835: Yup.mixed()
        .required('835 File is required')
        .test('fileFormat', 'Only .835 file format is allowed', (value) => {
            if (!value) return false;
            const file = value as File;
            const extension = file.name.split('.').pop()?.toLowerCase();
            return extension === '835';
        })
        .test('fileSize', 'File is too large. Max size is 25MB.', (value) => {
            if (!value) return false;
            const file = value as File;
            return file.size <= 25 * 1024 * 1024;
        }),

    file_pdf: Yup.mixed()
        .required('Bank Statement is required')
        .test('fileFormat', 'Only .pdf file format is allowed', (value) => {
            if (!value) return false;
            const file = value as File;
            const extension = file.name.split('.').pop()?.toLowerCase();
            return extension === 'pdf';
        })
        .test('fileSize', 'File is too large. Max size is 25MB.', (value) => {
            if (!value) return false;
            const file = value as File;
            return file.size <= 25 * 1024 * 1024;
        }),
});

export const addNewChecklistValidationSchema = Yup.object().shape({
    checklist_name: Yup.string().required("Name is required"),
    checklist_type: Yup.string().required("Checklist type is required"),
});

export const assignChecklistValidationSchema = (selectedType: string) => {
    const baseSchema: { [key: string]: any } = {
        question: Yup.string().required('Question is required'),
        note: Yup.string().required('Note is required'),
        action_item: Yup.string().required('Action item is required'),
        follow_up_dates: Yup.array().min(1, 'At least one follow-up date is required'),
        pharmacy_ids: Yup.array().min(1, 'At least one pharmacy must be selected'),
        status: Yup.string().required('Add Status'),
        pharmacy_comments: Yup.string().required('Add comments'),
        checklist_id: Yup.string().required('Checklist is required'),
        file: Yup.mixed().required('File is required')
    };
    if (selectedType === 'operations') {
        baseSchema.operational_item = Yup.string().required('Operational item is required');
    }

    return Yup.object().shape(baseSchema);
};

export const updatePharmacyChecklistValidationSchema = () => {
    return Yup.object().shape({
        pharmacy_comments: Yup.string().required('Add comments'),
        status: Yup.string().required('Add Status')
    });
};
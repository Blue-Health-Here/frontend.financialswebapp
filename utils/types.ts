export type Stats = {
    pharmacies: number | string;
    categories: number | string;
    monthly_expenses: number | string;
    tasks_completed: number | string;
};

export type StatsCardProps = {
    value: string | number;
    icon: string;
    label: string;
    color: string;
};

export type PharmacyCardProps = {
    pharmacy_id: string;
    pharmacy_name: string;
    expense: number;
    courses: number;
    total_assigned: number;
    total_completed: number;
    completion_percentage: number;
};

export type CourseProps = {
    course_id: string;
    title: string;
    link: string | null;
    filename: string;
    description: string;
};

export interface AddNewCourseFormValues {
    title: string;
    description: string;
    is_all?: Boolean;
    pharmacy_ids?: number[] | string[];
    uploadType?: 1 | 2 | "";
    link?: string;
    file?: File | null;
};

export interface UploadedFileProps {
    file_url?: string;
    filename?: string;
    path?: string
};

export type CategoryProps = {
    category_type: string;
    id: string;
    name: string;
};

export interface License {
    id: string;
    filename: string;
    file_url: string;
};

export type MarketingMaterialCardProps ={
    description : string;
    file_url: string | null;
    filename: string | null;
    link:string;
    marketing_id:string
    pharmacy_ids:string[];
    title: string
};

export interface AddNewMarketingMaterialsFormValues {
    title: string;
    description: string;
    is_all?: Boolean;
    pharmacy_ids?: number[] | string[];
    uploadType?: 1 | 2 | "";
    link?: string;
    file?: File | null;
};

export interface AddNewCourseFormValues {
    title: string;
    description: string;
    is_all?: Boolean;
    pharmacy_ids?: number[] | string[];
    uploadType?: 1 | 2 | "";
    link?: string;
    file?: File | null;
};

export interface UploadedFileProps {
    file_url?: string;
    filename?: string;
    path?: string
};

export interface BudgetDetailCardProps {
    image_url: string;
    pharmacy_id: string;
    pharmacy_title: string;
    profit: number;
    total_expense: number;
    total_revenue: number;
};

export type PharmacyExpenseProps = {
    title: string  ;
    amount: number;
    expense_date: string;
    category_id: string;
    revenue:number;
    id:string
};

export interface License {
    id: string;
    filename: string;
    file_url: string;
};

export interface AdminExpenseProps {
    id: string;
    title: string;
    amount: number;
    expense_date: string; 
    category_id: string;
    pharmacy_id: string;
    revenue: number;
};

export interface BudgetStatsCardProps {
    value?: number | string;
    icon: string;
    label?: string;
    color?: string;
};

export type AdminBudgetStatsValues = {
    monthly_expense: number;
    total_revenue: number;
    total_profit: number;
};
export interface Expense {
    month: string;
    total_expense: number;
}

export interface ExpenseChartProps {
    ExpenseData: Expense[];
}

export type pharmacyCourseProps = {
    course_id: string;
    description: string;
    file_url: string | null;
    filename: string;
    link: string | null;
    status: string;
    title: string;
};
export type pharmacyMarketingProps = {
    marketing_id: string;
    description: string;
    file_url: string | null;
    filename: string;
    link: string | null;
    status: string;
    title: string;
};
export type pharmacyDashboardStats = {
    assigned_courses: number | string;
    monthly_expense: number | string;
};

export interface FileDownloadFieldProps {
    title?: string;
    className?: string;
    parentClassName?: string;
    iconcolor?: string;
}

export interface PaymentReconciliationProps {
    id: string;
    payer_name: string;
    payment_date: string; 
    file_835: string;
    file_pdf: string;
    bank_amt: number;
    "835_amt": number;
    created_at: string;
    status: string;
}

export type ChecklistProps = {
    id: string,
    checklist_name: string,
    checklist_type: string

};

export interface OperationalItemsProps {
    id: string,
    name: string,
}

export interface AssignChecklistProps {
    checklist_id: string;
    question: string;
    note: string;
    action_item: string;
    operational_item: string;
    follow_up_dates: string[];
    pharmacy_ids: string[];
    file: null | {
        filename: string;
        file_url: string;
        path: string;
    };
    filename?: string;
    file_url?: string;
    path?: string;
}

export interface ChecklistOverviewProps {
    pharmacy_comments: string;
    status: string
}

export interface EditAssignTaskModalProps {
    selectedType: string;
    pharmacyId: string;
}
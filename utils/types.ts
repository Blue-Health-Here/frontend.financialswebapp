export type Stats = {
    pharmacies: number | string;
    categories: number | string;
    monthly_expenses: number | string;
    tasks_completed: number | string;
}

export type StatsCardProps = {
    value: string | number;
    icon: string;
    label: string;
    color: string;
}

export type PharmacyCardProps = {
    pharmacy_id: string;
    pharmacy_name: string;
    expense: number;
    courses: number;
    total_assigned: number;
    total_completed: number;
    completion_percentage: number;
}

export type CourseProps = {
    course_id: string;
    title: string;
    link: string | null;
    filename: string;
    description: string;
};

// Define TypeScript interface for form values
export interface AddNewCourseFormValues {
    title: string;
    description: string;
    is_all?: Boolean;
    pharmacy_ids?: number[] | string[]; // Assuming IDs are either numbers or strings
    uploadType?: 1 | 2 | "";
    link?: string;
    file?: File | null;
}

export interface UploadedFileProps {
    file_url?: string;
    filename?: string;
    path?: string
}

export type CategoryProps = {
    category_type: string;
    id: string;
    name: string;
};

export interface License {
    id: string;
    filename: string;
    file_url: string;
}

export type MarketingMaterialCardProps ={
    description : string;
    file_url: string | null;
    filename: string | null;
    link:string;
    marketing_id:string
    pharmacy_ids:string[];
    title: string
}

// Define TypeScript interface for form values
export interface AddNewMarketingMaterialsFormValues {
    title: string;
    description: string;
    is_all?: Boolean;
    pharmacy_ids?: number[] | string[]; // Assuming IDs are either numbers or strings
    uploadType?: 1 | 2 | "";
    link?: string;
    file?: File | null;
}

// Define TypeScript interface for form values
export interface AddNewCourseFormValues {
    title: string;
    description: string;
    is_all?: Boolean;
    pharmacy_ids?: number[] | string[]; // Assuming IDs are either numbers or strings
    uploadType?: 1 | 2 | "";
    link?: string;
    file?: File | null;
}

export interface UploadedFileProps {
    file_url?: string;
    filename?: string;
    path?: string
}

export interface BudgetDetailCardProps {
    image_url: string;
    pharmacy_id: string;
    pharmacy_title: string;
    profit: number;
    total_expense: number;
    total_revenue: number;
}

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
}
  

 export interface AdminExpenseProps {
    id: string;
    title: string;
    amount: number;
    expense_date: string; 
    category_id: string;
    pharmacy_id: string;
    revenue: number;
  }
  
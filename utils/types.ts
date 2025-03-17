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
    id: string;
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
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


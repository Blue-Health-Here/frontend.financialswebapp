import { pharmacyDashboardStatsData } from "./constants";
import { AdminBudgetStatsValues, pharmacyDashboardStats, Stats } from "./types";

export const assignStatsValues = (data: Stats) => {
    return [
        { value: data.categories, label: "Categories", color: "text-custom-green", icon: "/statistics-Category.svg" },
        { value: data.pharmacies, label: "Pharmacies", color: "text-custom-purple", icon: "/statistics-pharmacy.svg" },
        { value: `$${Number(data.monthly_expenses).toLocaleString()}`, label: "Total monthly expense", color: "text-custom-orange", icon: "/statistics-expense.svg" },
        { value: typeof data.tasks_completed === "string" && data.tasks_completed.includes('%') ? data.tasks_completed : `${data.tasks_completed}%`, label: "Total task completed", color: "text-custom-red", icon: "/statistics-task.svg" },
    ];
}

export const assignAdminBudgetStatsValues = (data: AdminBudgetStatsValues) => {
    return [
        { value: data.monthly_expense?.toLocaleString(), label: "Total monthly Expense", color: "text-primary", icon: "/statistic-dollar-total-revenue.svg" },
        { value: data.total_revenue?.toLocaleString(), label: "Revenue", color: "text-custom-orange", icon: "/statistic-dollar-total-expenese.svg" },
        { value: data.total_profit?.toLocaleString(), label: "Profit", color: "text-custom-green", icon: "/statistics-dollar-total-profit.svg" },
    ];
}

export const assignPharmacyStatsValues = (data: pharmacyDashboardStats) => {
    return pharmacyDashboardStatsData.map((item) => {
        switch (item.label) {
            case "Courses":
                return { ...item, value: `${data.assigned_courses}` };
            case "Total monthly expense":
                return { ...item, value: `$${Number(data.monthly_expense).toLocaleString()}` };
            default:
                return item;
        }
    });
};

export const formatCreatedAt = (dateString: string): string => {
    const createdAt = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - createdAt.getTime();
    const diffInSec = Math.floor(diffInMs / 1000);
    const diffInMin = Math.floor(diffInSec / 60);
    const diffInHours = Math.floor(diffInMin / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays === 0) {
        if (diffInHours > 0) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
        if (diffInMin > 0) return `${diffInMin} minute${diffInMin > 1 ? 's' : ''} ago`;
        return `Just now`;
    }

    if (diffInDays <= 10) {
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }

    return createdAt.toLocaleString(); // shows full date and time
}


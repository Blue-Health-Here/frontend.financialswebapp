import { AdminBudgetStatsValues, Stats } from "./types";

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
        { value: data.monthly_expense, label: "Total monthly Expense", color: "text-primary", icon: "/statistics-Category.svg" },
        { value: data.total_revenue, label: "Revenue", color: "text-custom-orange", icon: "/statistics-pharmacy.svg" },
        { value: data.total_profit, label: "Profit", color: "text-custom-green", icon: "/statistics-pharmacy.svg" },
    ];
}
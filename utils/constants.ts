import { useState } from "react";

// Pharmacy card data 
export const pharmacyData = [
    { id: 1, name: "Pharmacy XYZ-1", expense: "1500.00", courses: "2 / 5", progress: 50, image: "/Ellipse.png" },
    { id: 2, name: "Pharmacy ABC-2", expense: "1200.00", courses: "3 / 5", progress: 60, image: "/Ellipse.png" },
    { id: 3, name: "Pharmacy DEF-3", expense: "1800.00", courses: "4 / 5", progress: 80, image: "/Ellipse.png" },
    { id: 4, name: "Pharmacy GHI-4", expense: "1300.00", courses: "1 / 5", progress: 30, image: "/Ellipse.png" },
    { id: 5, name: "Pharmacy JKL-5", expense: "1400.00", courses: "3 / 5", progress: 70, image: "/Ellipse.png" },
    { id: 6, name: "Pharmacy MNO-6", expense: "1100.00", courses: "2 / 5", progress: 40, image: "/Ellipse.png" },
];

// Side bar data 
export const sidebarItems = [
    { name: "Dashboard", icon: "/sidebar-Dashboard-home.svg", path: "/admin/dashboard" },
    { name: "Pharmacies", icon: "/sidebar-pharmacy.svg", path: "/admin/pharmacies" },
    { name: "Budget", icon: "/sidebar-budget.svg", path: "/admin/budget" },
    { name: "Checklist", icon: "/sidebar-checklist.svg", path: "/admin/checklist" },
    { name: "Courses", icon: "/sidebar-courses.svg", path: "/admin/courses" },
    { name: "Categories", icon: "/sidebar-categories.svg", path: "/admin/categories" },
    { name: "Profile", icon: "/sidebar-profile.svg", path: "/admin/profile" }
];

// statistic card data
export const statsData = [
    { value: "55", label: "Categories", color: "text-custom-green", icon: "/statistics-Category.svg" },
    { value: "10", label: "Pharmacies", color: "text-custom-purple", icon: "/statistics-pharmacy.svg" },
    { value: "$567,435", label: "Total monthly expense", color: "text-custom-orange", icon: "/statistics-expense.svg" },
    { value: "75%", label: "Total task completed", color: "text-custom-red", icon: "/statistics-task.svg" },
];

//Admin Category Data
export const categoryData: Record<string, string[]> = {
    Onboarding: ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5", "Category 6", "Category 7", "Category 8", "Category 9", "Category 10", "Category 11", "Category 12"],
    Operations: ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5", "Category 6", "Category 7", "Category 8", "Category 9", "Category 10", "Category 11", "Category 12"],
    Expense: ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5", "Category 6", "Category 7", "Category 8", "Category 9", "Category 10", "Category 11", "Category 12"],
};

export const accordionData = [
    {
        title: 'Section 1',
        content: 'Content for section 1 goes here.',
    },
    {
        title: 'Section 2',
        content: 'Content for section 2 goes here.',
    },
    {
        title: 'Section 3',
        content: 'Content for section 3 goes here.',
    },
];

export const checklists = [
    {
        name: 'On boarding',
        list: [
            { title: 'Pharmacy Policy & Procedures', content: ['Content for course 1 goes here.', 'Content for course 1 goes here.', 'Content for course 1 goes here.'] },
            { title: 'Pharmacy Policy & Procedures', content: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Donec sodales scelerisque eleifend.', 'Nullam fermentum nunc nec.'] },
            { title: 'Pharmacy Policy & Procedures', content: ['Content for operational task 1.', 'Another point for operational task 1.'] },
        ]
    },
    {
        name: 'Operational',
        list: [
            { title: 'Pharmacy Policy & Procedures', content: 'Content for course 1 goes here.' },
            { title: 'Pharmacy Policy & Procedures', content: 'Content for course 2 goes here.' },
            { title: 'Pharmacy Policy & Procedures', content: 'Content for course 3 goes here.' },
        ]
    }
]

export const marketinMaterial = ['Marketing Material 1', 'Marketing Material 2', 'Marketing Material 3', 'Marketing Material 4', 'Marketing Material 5', 'Marketing Material 6']

export const corses = ['couse1', 'course2', 'course3', 'course4', 'course5', 'course6']

export const expenseCategories = [
    { name: "Utilities", budget: "10,000", actual: "8,000", percentage: 15 },
    { name: "Salaries", budget: "10,000", actual: "12,000", percentage: 5 },
    { name: "Rent", budget: "10,000", actual: "8,000", percentage: 15 },
];

export const budgetStatsData = [
    { value: "$3000.00", label: "Revenue", color: "text-primary", icon: "/statistic-dollar-total-revenue.svg" },
    { value: "$2000.00", label: "Total monthly Expense", color: "text-custom-orange", icon: "/statistic-dollar-total-expenese.svg" },
    { value: "$1000.00", label: "Profit", color: "text-custom-green", icon: "/statistics-dollar-total-profit.svg" },
];

export const chartData = {
    Xlabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "sep"],
    Ylables: [70, 80, 95, 90, 75, 100, 85, 95],
    barThickness: 8,
    barBackgroundColor: "#1E3A8A",
    label: "Pharmacy",
    showTicks: false,
    yAxixTitle: "Total Expense",
    yTitleColor: "#6E6B7B",
    pointStyle: "circle",
};

export const budgetChartData = {
    Xlabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "sep"],
    Ylables: [70, 80, 95, 90, 75, 100, 85, 95],
    barThickness: 8,
    barBackgroundColor: "#1E3A8A",
    label: "Pharmacy",
    showTicks: false,
    yAxixTitle: "Total Expense",
    yTitleColor: "#6E6B7B",
    pointStyle: "circle",
};

export const courseData = [
    { id: 1, title: "Course Title", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi malesuada ipsum nec tellus consequat, vitae dictum ", isSelected: false },
    { id: 2, title: "Course Title", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi malesuada ipsum nec tellus consequat, vitae dictum ", isSelected: false },
    { id: 3, title: "Course Title", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi malesuada ipsum nec tellus consequat, vitae dictum .", isSelected: false },
    { id: 4, title: "Course Title", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi malesuada ipsum nec tellus consequat, vitae dictum ", isSelected: false },
    { id: 5, title: "Course Title", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi malesuada ipsum nec tellus consequat, vitae dictum ", isSelected: false },
    { id: 6, title: "Course Title", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi malesuada ipsum nec tellus consequat, vitae dictum ", isSelected: false },
];

export const budgetData = [
    {
        name: "Security Camera",
        category: "Utilities",
        date: "30 Oct 2024",
        amount: "$1500",
    },
    {
        name: "Water",
        category: "Utilities",
        date: "30 Oct 2024",
        amount: "$500",
    },
    {
        name: "Security Camera",
        category: "Utilities",
        date: "30 Oct 2024",
        amount: "$1500",
    },
    {
        name: "Security Camera",
        category: "Utilities",
        date: "30 Oct 2024",
        amount: "$1500",
    },
    {
        name: "Security Camera",
        category: "Utilities",
        date: "30 Oct 2024",
        amount: "$1500",
    },
    {
        name: "Security Camera",
        category: "Utilities",
        date: "30 Oct 2024",
        amount: "$1500",
    }
];

export const onBoardingchecklists = [
    {
        name: 'Onboarding Checklist',
        progress: 50,
        list: [
            {
                title: 'Pharmacy Policy & Procedures',
                content: ['Content for course 1 goes here.', 'Content for course 1 goes here.', 'Content for course 1 goes here.']
            },
            {
                title: 'Pharmacy Policy & Procedures',
                content: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Donec sodales scelerisque eleifend.', 'Nullam fermentum nunc nec.']
            },
            {
                title: 'Pharmacy Policy & Procedures',
                content: ['Content for operational task 1.', 'Another point for operational task 1.']
            },
        ]
    },
];

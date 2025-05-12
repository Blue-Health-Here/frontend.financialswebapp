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

export const pharmacyBudgetDetail = [
    { id: 1, name: "Pharmacy XYZ-1", expense: "1500.00", revenue: "3000.00", profit: 50, image: "/Ellipse.png" },
    { id: 2, name: "Pharmacy ABC-2", expense: "1200.00", revenue: "3000.00", profit: 60, image: "/Ellipse.png" },
    { id: 3, name: "Pharmacy DEF-3", expense: "1800.00", revenue: "3000.00", profit: 80, image: "/Ellipse.png" },
    { id: 4, name: "Pharmacy GHI-4", expense: "1300.00", revenue: "3000.00", profit: 30, image: "/Ellipse.png" },
    { id: 5, name: "Pharmacy JKL-5", expense: "1400.00", revenue: "3000.00", profit: 70, image: "/Ellipse.png" },
    { id: 6, name: "Pharmacy MNO-6", expense: "1100.00", revenue: "3000.00", profit: 40, image: "/Ellipse.png" },
];


// Side bar data 
export const adminSidebarItems = [
    { name: "Dashboard", icon: "/sidebar-Dashboard-home.svg", path: "/admin/dashboard" },
    { name: "Pharmacies", icon: "/sidebar-pharmacy.svg", path: "/admin/pharmacies" },
    { name: "Budget", icon: "/sidebar-budget.svg", path: "/admin/budget" },
    { name: "Checklist", icon: "/sidebar-checklist.svg", path: "/admin/checklist" },
    { name: "Courses", icon: "/sidebar-courses.svg", path: "/admin/courses" },
    {name: "Marketing Materials", icon: "/sidebar-marketingMaterials.svg" ,path:"/admin/marketing"},
    { name: "Categories", icon: "/sidebar-categories.svg", path: "/admin/categories" },
    { name: "Profile", icon: "/sidebar-profile.svg", path: "/admin/profile" }
];

export const pharmacySidebarItems = [
    { name: "Dashboard", icon: "/sidebar-Dashboard-home.svg", path: "/pharmacy/dashboard" },
    { name: "Budget", icon: "/sidebar-budget.svg", path: "/pharmacy/budget" },
    { name: "Onboarding Checklist", icon: "/sidebar-checklist.svg", path: "/pharmacy/onboarding" },
    { name: "Operations Checklist", icon: "/sidebar-operations-checklis.svg", path: "/pharmacy/operations" },
    { name: "Document Verification", icon: "/sidebar-docs-verification.svg", path: "/pharmacy/document" },
    { name: "Courses", icon: "/sidebar-courses.svg", path: "/pharmacy/courses" },
    {name: "Marketing Materials", icon: "/sidebar-marketingMaterials.svg" ,path:"/pharmacy/marketing"},
    { name: "Profile", icon: "/sidebar-profile.svg", path: "/pharmacy/profile" }
];

// statistic card data
export const statsDataConstant = [
    { value: 0, label: "Categories", color: "text-custom-green", icon: "/statistics-Category.svg" },
    { value: 0, label: "Pharmacies", color: "text-custom-purple", icon: "/statistics-pharmacy.svg" },
    { value: "$0", label: "Total monthly expense", color: "text-custom-orange", icon: "/statistics-expense.svg" },
    { value: "0%", label: "Total task completed", color: "text-custom-red", icon: "/statistics-task.svg" },
];

// statistic card data
export const pharmacyDashboardStatsData = [
    { value: 0, label: "Courses", color: "text-custom-green", icon: "/statistics-Category.svg" },
    { value: "0%", label: "Operations Checklist", color: "text-custom-purple", icon: "/statistics-pharmacy.svg" },
    { value: "$0", label: "Total monthly expense", color: "text-custom-orange", icon: "/statistics-expense.svg" },
    { value: "0%", label: "Onboarding Checklist", color: "text-custom-red", icon: "/statistics-task.svg" },
];

//Admin Category Data
export const categoryData: Record<string, string[]> = {
    onboarding: ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5", "Category 6", "Category 7", "Category 8", "Category 9", "Category 10", "Category 11", "Category 12"],
    operations: ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5", "Category 6", "Category 7", "Category 8", "Category 9", "Category 10", "Category 11", "Category 12"],
    expense: ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5", "Category 6", "Category 7", "Category 8", "Category 9", "Category 10", "Category 11", "Category 12"],
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
        name: 'Onboarding',
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

export const expenseCategoriesData = [
    { name: "Utilities", budget: "10,000", actual: "8,000", percentage: 15 },
    { name: "Salaries", budget: "10,000", actual: "12,000", percentage: 5 },
    { name: "Rent", budget: "10,000", actual: "8,000", percentage: 15 },
];

export const categories = [
   {
      id: "c716df4e-0cdf-491d-9725-2e6bef304e63",
      name: "tech",
      category_type: "expense"
   }]

export const budgetStatsData = [
  { value: "0", label: "Revenue", color: "text-primary", icon: "/statistic-dollar-total-revenue.svg" },
  { value: "0", label: "Total monthly Expense", color: "text-custom-orange", icon: "/statistic-dollar-total-expenese.svg" },
  { value: "0", label: "Profit", color: "text-custom-green", icon: "/statistics-dollar-total-profit.svg" },
]

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

export const tableData = [
    { serial: "001", file: "835file.pdf", amt: "150.05", bankStatement: "BankStatement.pdf", bankAmt: "$150.05", time: "2 mins ago", status: "Cleared" },
    { serial: "002", file: "835file.pdf", amt: "150.05", bankStatement: "BankStatement.pdf", bankAmt: "$150.05", time: "2 mins ago", status: "Pending" },
    { serial: "003", file: "835file.pdf", amt: "150.05", bankStatement: "BankStatement.pdf", bankAmt: "$150.05", time: "2 mins ago", status: "Cleared" },
    { serial: "004", file: "835file.pdf", amt: "150.05", bankStatement: "BankStatement.pdf", bankAmt: "$150.05", time: "2 mins ago", status: "Pending" },
    { serial: "005", file: "835file.pdf", amt: "150.05", bankStatement: "BankStatement.pdf", bankAmt: "$150.05", time: "2 mins ago", status: "Cleared" },
    { serial: "006", file: "835file.pdf", amt: "150.05", bankStatement: "BankStatement.pdf", bankAmt: "$150.05", time: "2 mins ago", status: "Pending" },
    { serial: "007", file: "835file.pdf", amt: "150.05", bankStatement: "BankStatement.pdf", bankAmt: "$150.05", time: "2 mins ago", status: "Cleared" },
    { serial: "008", file: "835file.pdf", amt: "150.05", bankStatement: "BankStatement.pdf", bankAmt: "$150.05", time: "2 mins ago", status: "Pending" },
    { serial: "009", file: "835file.pdf", amt: "150.05", bankStatement: "BankStatement.pdf", bankAmt: "$150.05", time: "2 mins ago", status: "Cleared" },
    { serial: "010", file: "835file.pdf", amt: "150.05", bankStatement: "BankStatement.pdf", bankAmt: "$150.05", time: "2 mins ago", status: "Cleared" }
];

export const operationalchecklists = [
    {
        name: 'Operational Checklist',
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


export const fullLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];
export const fullDatasets = {
  Utility: [40, 20, 110, 50, 40, 60, 60, 70, 80, 40, 100],
  Salary: [50, 30, 90, 40, 90, 100, 60, 70, 40, 80, 100, 30],
  Rent: [30, 40, 50, 80, 70, 40, 90, 100, 80, 70, 60],
  Others: [40, 50, 60, 70, 40, 40, 100, 110, 40, 50, 80],
};
// Pharmacy card data 
export const pharmacyData = [
    { name: "Pharmacy XYZ", expense: "1500.00", courses: "2 / 5", progress: 50, image: "/avatar.jpg" },
    { name: "Pharmacy ABC", expense: "1200.00", courses: "3 / 5", progress: 60, image: "/avatar2.jpg" },
    { name: "Pharmacy DEF", expense: "1800.00", courses: "4 / 5", progress: 80, image: "/avatar3.jpg" },
    { name: "Pharmacy GHI", expense: "1300.00", courses: "1 / 5", progress: 30, image: "/avatar4.jpg" },
    { name: "Pharmacy JKL", expense: "1400.00", courses: "3 / 5", progress: 70, image: "/avatar5.jpg" },
    { name: "Pharmacy MNO", expense: "1100.00", courses: "2 / 5", progress: 40, image: "/avatar6.jpg" },
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
    { value: "55", label: "Categories", color: "text-custom-green" },
    { value: "10", label: "Pharmacies", color: "text-custom-purple" },
    { value: "$567,435", label: "Total monthly expense", color: "text-custom-orange" },
    { value: "75%", label: "Total task completed", color: "text-custom-red" },
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
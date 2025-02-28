import dashboardIcon from "../public/sidebar-Dashboard-home.svg";
import pharmacyIcon from "../public/sidebar-pharmacy.svg";
import budgetIcon from "../public/sidebar-budget.svg";
import checklistIcon from "../public/sidebar-checklist.svg";
import coursesIcon from "../public/sidebar-courses.svg";
import categoriesIcon from "../public/sidebar-categories.svg";
import profileIcon from "../public/sidebar-profile.svg";
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
    { name: "Dashboard", icon: dashboardIcon },
    { name: "Pharmacies", icon: pharmacyIcon },
    { name: "Budget", icon: budgetIcon },
    { name: "Checklist", icon: checklistIcon },
    { name: "Courses", icon: coursesIcon },
    { name: "Categories", icon: categoriesIcon },
    { name: "Profile", icon: profileIcon }
];

// statistic card data
export const statsData = [
    { value: "55", label: "Categories", color: "text-green-500" },
    { value: "10", label: "Pharmacies", color: "text-purple-500" },
    { value: "$567.435", label: "Total monthly expense", color: "text-orange-500" },
    { value: "75%", label: "Total task completed", color: "text-red-500" },
];
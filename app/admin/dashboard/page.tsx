"use client";
import Image from "next/image";
import dashboardIcon from "../../../public/sidebar-Dashboard-home.svg";
import pharmacyIcon from "../../../public/sidebar-pharmacy.svg";
import budgetIcon from "../../../public/sidebar-budget.svg";
import checklistIcon from "../../../public/sidebar-checklist.svg";
import coursesIcon from "../../../public/sidebar-courses.svg";
import categoriesIcon from "../../../public/sidebar-categories.svg";
import profileIcon from "../../../public/sidebar-profile.svg";
import notificatioIcon from "../../../public/notification-icon.svg"
import exitIcon from "../../../public/navbar-exit-right.svg"
import profileImage from "../../../public/profile-image.png"
import searchIcon from "../../../public/search-icon.svg"
import { Input } from "@/components/ui/input";
import { useState } from "react";
// Side bar data 
const sidebarItems = [
    { name: "Dashboard", icon: dashboardIcon },
    { name: "Pharmacies", icon: pharmacyIcon },
    { name: "Budget", icon: budgetIcon },
    { name: "Checklist", icon: checklistIcon },
    { name: "Courses", icon: coursesIcon },
    { name: "Categories", icon: categoriesIcon },
    { name: "Profile", icon: profileIcon }
];
// statistic card data
const statsData = [
    { value: "55", label: "Categories", color: "text-green-500" },
    { value: "10", label: "Pharmacies", color: "text-purple-500" },
    { value: "$567.435", label: "Total monthly expense", color: "text-orange-500" },
    { value: "75%", label: "Total task completed", color: "text-red-500" },
];

// Pharmacy card data 
const pharmacyData = [
    { name: "Pharmacy XYZ", expense: "1500.00", courses: "2 / 5", progress: 50, image: "/avatar.jpg" },
    { name: "Pharmacy ABC", expense: "1200.00", courses: "3 / 5", progress: 60, image: "/avatar2.jpg" },
    { name: "Pharmacy DEF", expense: "1800.00", courses: "4 / 5", progress: 80, image: "/avatar3.jpg" },
    { name: "Pharmacy GHI", expense: "1300.00", courses: "1 / 5", progress: 30, image: "/avatar4.jpg" },
    { name: "Pharmacy JKL", expense: "1400.00", courses: "3 / 5", progress: 70, image: "/avatar5.jpg" },
    { name: "Pharmacy MNO", expense: "1100.00", courses: "2 / 5", progress: 40, image: "/avatar6.jpg" },
];

// statistic card
const StatCard = ({ value, label, color }: { value: string; label: string; color: string }) => {
    return (
        <div className="h-[168px] w-full p-6 bg-white rounded-lg shadow-md text-center flex flex-col justify-center">
            <p className={`text-2xl font-semibold ${color}`}>{value}</p>
            <p className="text-gray-500">{label}</p>
        </div>
    );
};

// Pharmacy Card
const PharmacyCard = ({ pharmacy }: any) => {
    return (
        <div className="bg-white rounded-lg shadow-xl p-4 flex flex-col">
            <div className="flex flex-col gap-3">
                <Image src={profileImage} alt="" className="w-12 h-12 rounded-full" />
                <h2 className="font-bold">{pharmacy.name}</h2>
            </div>
            <div className="mt-3 flex flex-col gap-y-4 text-black leading-3">
                <p className="text-[16px] font-[500]">Total Expense <span className="text-[16px] font-[500] float-right">${pharmacy.expense}</span></p>
                <p className="text-[12px] font-[600]">Courses Completed <span className="text-[12px] font-[600] float-right">{pharmacy.courses}</span></p>
                <div>
                    <p className="text-[12px] font-[600]">Onboarding Checklist Progress <span className="text-[12px] font-[600] float-right">{pharmacy.progress}%</span></p>
                    <div className="w-full bg-gray-200 rounded-full h-[4px] mt-2">
                        <div className="bg-primary h-[4px] rounded-full" style={{ width: `${pharmacy.progress}%` }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default function Dashboard() {
    const [activeItem, setActiveItem] = useState(null);
    return (
        <div className="flex min-h-screen bg-gray-100 overflow-x-hidden">

            {/* Sidebar */}
            <aside className="w-[266px] bg-primary text-white shadow-lg pt-8 pb-8 pl-4 pr-4 fixed left-0 top-0 h-full">
                <h1 className="text-xl text-center font-semibold">LOGO</h1>
                <ul className="mt-16 space-y-2 text-[15px]">
                    {sidebarItems.map((item, index) => (
                        <li key={index}
                            className={`flex items-center gap-x-3 p-3 rounded-lg cursor-pointer transition 
                                ${activeItem === index ? "bg-secondary" : "hover:bg-secondary"}`}
                            onClick={() => setActiveItem(index)}
                        >
                            <Image src={item.icon} alt={`${item.name} Icon`} width={20} height={20} />
                            <span>{item.name}</span>
                        </li>
                    ))}
                </ul>
            </aside>



            {/*  Page Content right side*/}
            <div className="flex-1 ml-[266px] p-6">

                {/* Navbar */}
                <nav className="flex items-center justify-between bg-white shadow-lg p-4 h-[62px] rounded-lg">
                    <p className="text-sm md:text-[21px]">Wednesday, 14 Jan 24</p>

                    <div className="flex items-center gap-x-4 md:gap-x-6 cursor-pointer">
                        <Image src={notificatioIcon} alt="Notification" width={17} height={19} />

                        <div className="flex items-center gap-x-2 md:gap-x-4">
                            <div className="hidden md:block text-right">
                                <span className="text-gray-700">Sam Lee</span>
                                <p className="text-[#B9B9C3] text-sm">Admin</p>
                            </div>

                            <Image src={profileImage} alt="Profile" className="w-8 h-8 md:w-auto md:h-auto" />
                            <Image src={exitIcon} alt="Exit" className="w-6 h-6 md:w-auto md:h-auto" />
                        </div>
                    </div>
                </nav>

                {/* Statistics */}
                <div className="mt-4">
                    <h3 className="text-[#5E5873] p-2">Statistics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Section: Statistics */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {statsData.map((item, index) => (
                                <StatCard key={index} value={item.value} label={item.label} color={item.color} />
                            ))}
                        </div>

                        {/* Right Section: Chart */}
                        <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-center">
                            <p className="text-gray-500">[Insert Chart Component Here]</p>
                        </div>
                    </div>
                </div>

                {/* Pharmacies */}
                <div className="mt-6 pl-6 pr-6 pt-12 pb-12 bg-white shadow-lg rounded-lg">
                    <div className="flex items-center justify-between flex-wrap gap-4 pb-6">
                        <h1>Pharmacies</h1>
                        <div className="relative w-[390px] sm:max-w-md">
                            <Input name="email" placeholder="Search Pharmacy" className="h-[42px] border-none shadow-lg rounded-lg" />
                            <span className="absolute right-3 top-2.5 text-gray-500">
                                <Image src={searchIcon} alt="" />
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pharmacyData.map((pharmacy, index) => (
                            <PharmacyCard key={index} pharmacy={pharmacy} />
                        ))}
                    </div>
                </div>
            </div >
        </div >
    );
}
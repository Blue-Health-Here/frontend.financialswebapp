
"use client";
import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import searchIcon from "../../public/search-icon.svg";
import AdminLayout from "@/components/layouts/AdminLayout";
import InfoCard from "@/components/common/InfoCard";
import { Button } from "@/components/ui/button";
import { categoryData } from "@/utils/constants";

export default function CategoryContent() {
    const [selectedCategory, setSelectedCategory] = useState("Onboarding");

    return (

        <div className="flex">
            {/*Secondary Sidebar */}
            <aside className=" max-w-[250px] min-w-[250px] xl:min-w-[300px] xl:max-w-[300px] pt-8 pb-8 pl-4 pr-4 fixed left-[250px] xl:left-[318px] top-20 h-auto z-[999]
">
                <h3 className="text-[#5E5873] pb-4">Categories</h3>
                <ul className="space-y-3">
                    {Object.keys(categoryData).map((category) => (
                        <li
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-md cursor-pointer text-blue-700 font-medium ${selectedCategory === category
                                ? "bg-secondary "
                                : "hover:bg-secondary"
                                }`}
                        >
                            {category}
                        </li>
                    ))}
                </ul>
            </aside>

            <main className="flex-1 pt-10 ml-[250px] xl:ml-[300px]">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <div className="flex items-center justify-between pb-6">
                        <h1 className="text-xl font-semibold">{selectedCategory}</h1>
                        <Button className="bg-secondary hover:bg-[#65acfd]">
                            Save Changes
                        </Button>
                    </div>

                    <div className="flex justify-between items-center pb-6">
                        <div className="flex items-center space-x-3">
                            <h4 className="text-[16px] text-gray-700">Add Categories</h4>
                            <Button className="w-7 h-7 text-2xl bg-secondary hover:bg-[#65acfd] pb-2.5">
                                +
                            </Button>
                        </div>
                        <div className="relative w-80">
                            <Input
                                name="search"
                                placeholder="Search Category"
                                className="h-[42px] border-gray-300 shadow-md rounded-lg pl-4"
                            />
                            <span className="absolute right-3 top-2.5 text-gray-500 cursor-pointer">
                                <Image src={searchIcon} alt="Search" />
                            </span>
                        </div>
                    </div>

                    {/* Category List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {categoryData[selectedCategory]?.map((category, index) => (
                            <InfoCard key={index} courseName={category} />
                        ))}

                    </div>
                </div>
            </main>
        </div>
    );
}


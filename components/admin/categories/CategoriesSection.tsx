"use client";
import React from 'react'
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";
import InfoCard from "@/components/common/InfoCard";
import { Button } from "@/components/ui/button";
import { categoryData } from "@/utils/constants";
import { FaPlus } from "react-icons/fa";
import { SubmitButton } from '@/components/submit-button';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAddCategory } from '@/store/features/category/categorySlice';
import { RootState } from '@/store/store';
import AddCategoryModal from './AddCategoryModal';
const CategoriesSection = () => {
    const [selectedCategory, setSelectedCategory] = useState("Onboarding");
    const { isAddCategory } = useSelector((state: RootState) => state.category);
    const dispatch = useDispatch();

    return (
        <div className="flex">
            {/*Secondary Sidebar */}
            <aside className=" max-w-[250px] min-w-[250px] xl:min-w-[300px] xl:max-w-[300px] pt-8 pb-8 pl-4 pr-4 fixed left-[250px] xl:left-[318px] top-20 h-auto z-[999]">
                <h3 className="text-themeGrey pb-4 font-medium">Categories</h3>
                <ul className="space-y-3">
                    {Object.keys(categoryData).map((category) => (
                        <li
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-md cursor-pointer text-blue-700 font-semibold ${selectedCategory === category
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
                        <SubmitButton className="bg-secondary hover:text-white">
                            Save Changes
                        </SubmitButton>
                    </div>

                    <div className="flex justify-between items-center pb-6">
                        <div className="flex items-center space-x-3">
                            <h4 className="text-[16px] text-grey">Add Categories</h4>
                            <Button className="group w-7 h-7 p-1 text-white bg-secondary hover:text-white" onClick={() => dispatch(setIsAddCategory(true))}>
                                <FaPlus className=" text-black group-hover:text-white" size={12} />
                            </Button>
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
            {isAddCategory && <AddCategoryModal />}
        </div>
    )
}

export default CategoriesSection
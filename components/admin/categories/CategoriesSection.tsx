"use client";

import React, { useEffect } from 'react'
import { useState } from "react";
import InfoCard from "@/components/common/InfoCard";
import { Button } from "@/components/ui/button";
import { categoryData } from "@/utils/constants";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryDetails, setIsAddCategory } from '@/store/features/admin/category/adminCategorySlice';
import { RootState } from '@/store/store';
import AddCategoryModal from './AddCategoryModal';
import { deleteCategory, fetchAllCategories } from '@/services/adminServices';
import { capitalize } from '@/utils/helperClient';
import { CategoryProps } from '@/utils/types';
import TextMessage from '@/components/common/TextMessage';
import { Input } from '@/components/ui/input';
import { IoSearch } from "react-icons/io5";


const CategoriesSection = () => {
    const [selectedCategory, setSelectedCategory] = useState("onboarding");
    const [searchCategory, setSearchCategory] = useState("");
    const { isAddCategory, categories } = useSelector((state: RootState) => state.category);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    
    useEffect(() => {
        fetchAllCategories(dispatch, selectedCategory).finally(() => setLoading(false));
    }, [selectedCategory, dispatch]);

    const handleDeleteCourse = (id: string) => {
        deleteCategory(dispatch, id,selectedCategory);
    };

    const handleAddCategory = () => {
        dispatch(setIsAddCategory(true));
        dispatch(setCategoryDetails(null));
    };

    const handleEditCategory = (data:CategoryProps) => {
        dispatch(setIsAddCategory(true));
        dispatch(setCategoryDetails(data));
    };

    const handleSearchCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchCategory(e.target.value);
    }
    const filterCategories = categories.filter((category: CategoryProps) => {
        const nameMatches = category.name.toLowerCase().includes(searchCategory.toLowerCase());
        return nameMatches;
     });

    return (
        <div className="flex flex-col md:flex-row ">
            {/*Secondary Sidebar */}
            <aside className=" md:w-[250px] xl:w-[300px] pb-4 md:py-8 px-4 md:fixed  lg:left-[250px] xl:left-[318px] md:top-20 md:h-auto ">
                <h3 className="text-themeGrey text-lg md:text-xl pb-4 font-medium">Categories</h3>
                <ul className="space-y-3">
                    {Object.keys(categoryData).map((category) => (
                        <li
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2  rounded-md cursor-pointer text-xs sm:text-sm md:text-[16px] text-primary font-semibold ${selectedCategory === category
                                ? "bg-secondary "
                                : "hover:bg-secondary"
                                }`}
                        >
                            {capitalize(category)}
                        </li>
                    ))}
                </ul>
            </aside>

            <main className="flex-1 md:pt-10 md:ml-[250px] xl:ml-[300px]">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <div className="flex items-center justify-between flex-wrap gap-4 pb-6">
                        <h1 className="text-lg md:text-xl font-semibold">{capitalize(selectedCategory)}</h1>
              <div className="relative w-full md:w-48">
                  <Input 
                  name="search"
                  onChange={handleSearchCategory}
                  value={searchCategory}
                  placeholder="Search Checklist" 
                  className="border-none shadow-lg rounded-lg font-medium placeholder:text-xs"
                   />
                    <span className="absolute right-3 top-2.5 text-gray-500 cursor-pointer">
                        <IoSearch size={18} />
                     </span>
                 </div>
                    </div>

                    <div className="flex justify-between items-center pb-6">
                        <div className="flex items-center space-x-3">
                            <h4 className="text-xs sm:text-sm md:text-[16px]  text-grey">Add Categories</h4>
                            <Button className="group w-6 h-6 md:w-7 md:h-7 p-1 text-white bg-secondary hover:text-white" onClick={handleAddCategory}>
                                <FaPlus className=" text-black group-hover:text-white" size={12} />
                            </Button>
                        </div>
                    </div>

                    {/* Category List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {loading ? (
                                <p>Loading pharmacies...</p>
                            ) :(filterCategories.length > 0 ? filterCategories?.map((category: CategoryProps, index: number) => (
                                <InfoCard id={category.id} key={index} name={category.name} item={category} handleDeleteModal={handleDeleteCourse} handleEdit={(item: any) => handleEditCategory(item)}/>
                            )) : <TextMessage text="No Category match your search criteria" />)}
                    </div>
                </div>
            </main>
            {isAddCategory && <AddCategoryModal categoryType={selectedCategory}/>}
        </div>
    )
}


export default CategoriesSection;
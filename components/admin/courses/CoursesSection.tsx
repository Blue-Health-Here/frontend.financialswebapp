"use client"

import { Input } from "../../ui/input";
import InfoCard from "../../common/InfoCard";
import AddCourseModal from "./AddCourseModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setIsAddCourse } from "@/store/features/admin/course/adminCourseSlice";
import { IoSearch } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { SubmitButton } from "@/components/submit-button";
import { corses } from "@/utils/constants";

const CoursesSection = () => {
    const { isAddCourse } = useSelector((state: RootState) => state.course);
    const dispatch = useDispatch();

    const handleAddCourse = () => {
        dispatch(setIsAddCourse(true))
    };

    return (
        <div className="p-6 pt-8 pb-9 bg-white shadow-lg rounded-lg">
            <div className="flex items-center justify-between flex-wrap gap-4 pb-6">
                <div className="flex items-center justify-between gap-3">
                    <h1>Courses</h1><SubmitButton onClick={handleAddCourse} className="w-7 h-7 p-1 text-white"><FaPlus className="text-white" size={12} /></SubmitButton>

                </div>
                <div className="relative w-[390px] sm:max-w-md">
                    <Input name="email" placeholder="Search Courses" className="h-[42px] border-none shadow-lg rounded-lg font-medium" />
                    <span className="absolute right-3 top-2.5 text-gray-500 cursor-pointer">
                        <IoSearch className="w-5 h-5" />
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {corses.map((course, index) => (
                    <InfoCard key={index} courseName={course} />
                ))}
            </div>
            {isAddCourse && <AddCourseModal />}
        </div>
    );
};

export default CoursesSection;

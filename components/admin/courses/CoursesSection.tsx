"use client"

import { Input } from "../../ui/input";
import InfoCard from "../../common/InfoCard";
import AddCourseModal from "./AddCourseModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setCourseDetails, setIsAddCourse } from "@/store/features/admin/course/adminCourseSlice";
import { IoSearch } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { SubmitButton } from "@/components/submit-button";
import { useEffect, useRef } from "react";
import { fetchAllCourses } from "@/services/adminServices";
import { AddNewCourseFormValues, CourseProps } from "@/utils/types";
import { setIsLoading } from "@/store/features/global/globalSlice";

const CoursesSection = () => {
    const { isAddCourse, courses } = useSelector((state: RootState) => state.course);
    const dispatch = useDispatch();
    const isFetched = useRef(false);

    const handleAddCourse = () => {
        dispatch(setIsAddCourse(true));
        dispatch(setCourseDetails(null));
    };

    const handleEditCourse = (data: AddNewCourseFormValues) => {
        dispatch(setIsAddCourse(true));
        dispatch(setCourseDetails(data));
    };

    useEffect(() => {
        if (!isFetched.current) {
            isFetched.current = true;
            fetchAllCourses(dispatch);
        }
    }, []);
    
    return (
        <div className="p-6 pt-8 pb-9 bg-white shadow-lg rounded-lg">
            <div className="flex items-center justify-between flex-wrap gap-4 pb-6">
                <div className="flex items-center justify-between gap-3">
                    <h1 className="text-lg md:text-2xl">Courses</h1><SubmitButton onClick={handleAddCourse} className="w-6 h-6 md:w-7 md:h-7 p-1 text-white"><FaPlus className="text-white" size={12} /></SubmitButton>

                </div>
                <div className="relative w-[390px] sm:max-w-md">
                    <Input name="email" placeholder="Search Courses" className="h-[42px] border-none shadow-lg rounded-lg font-medium" />
                    <span className="absolute right-3 top-2.5 text-gray-500 cursor-pointer">
                        <IoSearch className="md:w-5 md:h-5" />
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.length > 0 && courses.map((course: CourseProps, index: number) => (
                    <InfoCard key={index} item={course} name={course?.title} handleEdit={(item: any) => handleEditCourse(item)} />
                ))}
            </div>
            {isAddCourse && <AddCourseModal />}
        </div>
    );
};

export default CoursesSection;

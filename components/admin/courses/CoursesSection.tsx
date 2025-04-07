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
import { useEffect, useRef, useState } from "react";
import { deleteCourse, fetchAllCourses } from "@/services/adminServices";
import { AddNewCourseFormValues, CourseProps } from "@/utils/types";
import TextMessage from "@/components/common/TextMessage";

const CoursesSection = () => {
    const { isAddCourse, courses } = useSelector((state: RootState) => state.course);
    const [searchCourse, setSearchCourse] = useState("");
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const isFetched = useRef(false);

    useEffect(() => {
        if (isAddCourse) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isAddCourse]);

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
            fetchAllCourses(dispatch).finally(() => setLoading(false));
        }
    }, []);

    const handleDeleteCourse = (id?: string) => {
        deleteCourse(dispatch, id);
    };
    const filterCourses = courses.filter((course: CourseProps) => {
        const nameMatches = course.title.toLowerCase().includes(searchCourse.toLowerCase());
        return nameMatches; });
    
    return (
        <div className="p-6 pt-8 pb-9 bg-white shadow-lg rounded-lg">
            <div className="flex items-center justify-between flex-wrap gap-4 pb-6">
                <div className="flex items-center justify-between gap-3">
                    <h1 className="text-lg md:text-2xl">Courses</h1><SubmitButton onClick={handleAddCourse} className="w-6 h-6 md:w-7 md:h-7 p-1 text-white"><FaPlus className="text-white" size={12} /></SubmitButton>

                </div>
                <div className="relative w-[390px] sm:max-w-md">
                    <Input 
                     name="search"
                     value={searchCourse}
                     onChange={(e) => setSearchCourse(e.target.value)}   
                     placeholder="Search Courses" 
                     className="h-[42px] border-none shadow-lg rounded-lg font-medium" />
                    <span className="absolute right-3 top-2.5 text-gray-500 cursor-pointer">
                        <IoSearch className="md:w-5 md:h-5" />
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <TextMessage text="Loading courses..." />
                ):
                (filterCourses.length > 0 ? filterCourses.map((course: CourseProps, index: number) => (
                    <InfoCard id={course?.course_id} key={index} item={course} name={course?.title} handleDeleteModal={handleDeleteCourse} handleEdit={(item: any) => handleEditCourse(item)} />
                )) : (
                    <TextMessage text="Courses not found." />
                ))}
            </div>
            {isAddCourse && <AddCourseModal />}
        </div>
    );
};

export default CoursesSection;

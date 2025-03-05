"use client"

import Image from "next/image";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import InfoCard from "../../common/InfoCard";
import AddCourseModal from "./AddCourseModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setIsAddCourse } from "@/store/features/course/courseSlice";
// import Accordion from "@/components/common/Accordion";
// import { accordionData } from "@/utils/constants";

const CoursesSection = () => {
    const corses = ['couse1', 'course2', 'course3', 'course4', 'course5', 'course6']
    const { isAddCourse } = useSelector((state: RootState) => state.course);
    const dispatch = useDispatch();

    const handleAddCourse = () => {
        dispatch(setIsAddCourse(true))
    };

    return (
        <div className="p-6 pt-8 pb-9 bg-white shadow-lg rounded-lg">
            <div className="flex items-center justify-between flex-wrap gap-4 pb-6">
                <div className="flex items-center justify-between gap-3">
                    <h1>Courses</h1><Button onClick={handleAddCourse} className="w-6 h-7 text-2xl text-white pb-2.5">+</Button>
                </div>
                <div className="relative w-[390px] sm:max-w-md">
                    <Input name="email" placeholder="Search Courses" className="h-[42px] border-none shadow-lg rounded-lg font-medium" />
                    <span className="absolute right-3 top-2.5 text-gray-500 cursor-pointer">
                        <Image src="/search-icon.svg" alt="" width={30} height={30} />
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {corses.map((course, index) => (
                    <InfoCard key={index} courseName={course} />
                ))}
            </div>
            {/* <Accordion items={accordionData} /> */}
            {isAddCourse && <AddCourseModal />}
        </div>
    );
};

export default CoursesSection;

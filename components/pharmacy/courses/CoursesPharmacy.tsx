"use client"

import { Input } from "../../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { IoSearch } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { fetchAllPharmacyCourses } from "@/services/pharmacyServices";
import TextMessage from "@/components/common/TextMessage";
import { pharmacyCourseProps } from "@/utils/types";
import PharmacyInfoCrad from "@/components/common/PharmacyInfoCrad";


const CoursesPharmacy = () => {
    const { courses } = useSelector((state: RootState) => state.pharmacyCourse);
    const [loading, setLoading] = useState(true);
    const [searchCourse, setSearchCourse] = useState("");
    const dispatch = useDispatch();
    const isFetched = useRef(false);


    useEffect(() => {
        if (!isFetched.current) {
            isFetched.current = true;
            fetchAllPharmacyCourses(dispatch).finally(() => setLoading(false));
        }

    }, []);

    const filterCourses = courses.filter((course: pharmacyCourseProps) => {
        const nameMatches = course.title.toLowerCase().includes(searchCourse.toLowerCase());
        return nameMatches;
    });

    return (
        <div className="p-6 pt-8 pb-9 bg-white shadow-lg rounded-lg">
            <div className="flex items-center justify-between flex-wrap gap-4 pb-6">
                <div className="flex items-center justify-between gap-3">
                    <h1>Courses</h1>

                </div>
                {courses.length > 0 && (
                    <div className="relative w-[390px] sm:max-w-md">
                        <Input
                            value={searchCourse}
                            onChange={(e) => setSearchCourse(e.target.value)}
                            name="email"
                            placeholder="Search Courses"
                            className="h-[42px] border-none shadow-lg rounded-lg font-medium" />
                        <span className="absolute right-3 top-2.5 text-gray-500 cursor-pointer">
                            <IoSearch className="w-5 h-5" />
                        </span>
                    </div>
                )}

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <TextMessage text="Loading courses..." />
                ) :
                    (filterCourses.length > 0 ? filterCourses.map((course: pharmacyCourseProps, index: number) => (
                        <PharmacyInfoCrad
                            key={index}
                            title={course.title}
                            description={course.description}
                            link={course.link}
                            file_url={course.file_url}
                            filename={course.filename}
                        />
                    )) : (
                        <TextMessage text="Courses not found." />
                    ))}
            </div>

        </div>
    );
};

export default CoursesPharmacy;

import React, { useState } from 'react'
import { SubmitButton } from '@/components/submit-button'
import { IoIosArrowBack } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { MdKeyboardArrowRight } from "react-icons/md";
import Image from 'next/image';
import FileUploadField from '@/components/common/form/FileUploadField';
import { Form, Formik } from 'formik';
import { checklists, courseData } from '@/utils/constants';
import Accordion from '@/components/common/Accordion';
import { Input } from '@/components/ui/input';
import { IoSearch } from "react-icons/io5";
import CourseCard from './CourseCard';

const PharmacyDetail = () => {
    const [courses, setCourses] = useState(courseData)
    const toggleSelect = (id: number) => {
        setCourses((prevCourses) =>
            prevCourses.map((course) =>
                course.id === id ? { ...course, isSelected: !course.isSelected } : course
            )
        );
    };

    return (

        <>
            <div className="px-6 py-8 bg-white shadow-lg rounded-lg">
                <div className="flex items-center justify-between">
                    <div className="flex gap-x-2 items-center">
                        <SubmitButton className='bg-white border p-2'>
                            <IoIosArrowBack size={20} />
                        </SubmitButton>
                        <GoHome />
                        <p>Pharmacies</p>
                        <MdKeyboardArrowRight />
                        <p>Pharmacy XYZ</p>
                    </div>
                    <div className="flex gap-x-2 items-center">
                        <SubmitButton className="bg-secondary hover:text-white">
                            Save Changes
                        </SubmitButton>
                        <Image src="/delete-icon.svg" alt="" width={20} height={20} />
                    </div>
                </div>
                <div className="py-6 grid grid-cols-2 gap-x-36 items-center">
                    <div className="flex items-center gap-x-6">
                        <div>
                            <Image
                                src="/profile-image.png"
                                alt="Profile Image"
                                className="rounded-full object-cover"
                                width={300}
                                height={300}
                            />
                        </div>

                        <div className="space-y-3 text-black w-full">
                            <h2 className="font-bold text-xl">Pharmacy XYZ</h2>

                            <div className="flex justify-between">
                                <p className="text-[14px] font-medium">Total Expense</p>
                                <span className="text-[14px] font-medium">$5000</span>
                            </div>

                            <div className="flex justify-between">
                                <p className="text-[12px] font-semibold">Courses Completed</p>
                                <span className="text-[12px] font-semibold">10</span>
                            </div>

                            <div className="w-full">
                                <div className="flex justify-between">
                                    <p className="text-[12px] font-semibold">Onboarding Checklist Progress</p>
                                    <span className="text-[12px] font-semibold">80%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-[5px] mt-1">
                                    <div className="bg-blue-500 h-[5px] rounded-full" style={{ width: `80%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-black space-y-3">
                        <p className="text-[14px]">
                            <span className="font-bold">Address:</span> Lorem ipsum dolor sit amet.
                        </p>
                        <p className="text-[14px]">
                            <span className="font-bold">Email:</span> JohnDoe@gmail.com
                        </p>
                        <p className="text-[14px]">
                            <span className="font-bold">Contact:</span> 123456789
                        </p>
                    </div>
                </div>


                <div className="">
                    <Formik
                        initialValues={{ documents: [] }}
                        onSubmit={(values) => console.log(values)}
                    >
                        {() => (
                            <Form>
                                <FileUploadField label="Licensing" name="file" isMultiSelect={true} className='w-60' />
                            </Form>
                        )}
                    </Formik>
                    <Formik
                        initialValues={{ documents: [] }}
                        onSubmit={(values) => console.log(values)}
                    >
                        {() => (
                            <Form className='w-full'>
                                <FileUploadField label="Certifications" name="file" isMultiSelect={true} className='w-60' />
                            </Form>
                        )}
                    </Formik>

                </div>

            </div>



            {checklists.map((checklist, index) => (
                <div className="w-full mt-6  px-6 py-8 bg-white shadow-lg rounded-lg" key={index}>
                    <div className="flex flex-col gap-6">
                        <h1 className="text-lg mb-4">{checklist.name + " Checklist"}</h1>
                        <Accordion key={index} items={checklist.list} />
                    </div>
                </div>
            ))}
            <div className="mt-6 px-6 py-8 bg-white shadow-lg rounded-lg">
                <div className="flex items-center justify-between flex-wrap gap-4 pb-6">
                    <h1>Courses</h1>
                    <div className="relative w-[390px] sm:max-w-md">
                        <Input name="email" placeholder="Search Courses" className="h-[42px] border-none shadow-lg rounded-lg font-medium" />
                        <span className="absolute right-3 top-2.5 text-gray-500 cursor-pointer">
                            <IoSearch className="w-5 h-5" />
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <CourseCard key={course.id} {...course} onSelect={() => toggleSelect(course.id)} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default PharmacyDetail

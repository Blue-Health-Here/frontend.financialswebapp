"use client"
import React, { useEffect, useState } from 'react'
import { SubmitButton } from '@/components/submit-button'
import { IoIosArrowBack } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { MdKeyboardArrowRight } from "react-icons/md";
import Image from 'next/image';
import FileUploadField from '@/components/common/form/FileUploadField';
import { Form, Formik } from 'formik';
import { checklists, courseData, pharmacyData } from '@/utils/constants';
import Accordion from '@/components/common/Accordion';
import { Input } from '@/components/ui/input';
import { IoSearch } from "react-icons/io5";
import CourseCard from './CourseCard';
import FileDownloadField from '@/components/common/form/FileDownloadField';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setIsAddQuestion } from '@/store/features/pharmacy/pharmacySlice';
import AddNewQuestionModal from './AddNewQuestionModal';

const PharmacyDetail = () => {
    const [courses, setCourses] = useState(courseData)
    const { isAddQuestion } = useSelector((state: RootState) => state.pharmacy)
    const dispatch = useDispatch()
    const router = useRouter();
    const params = useParams()
    const id = params.id


    const pharmacy = pharmacyData.find((pharmacy) => pharmacy.id === Number(id))
    if (!pharmacy) {
        return <p>Pharmacy not found.</p>;
    }


    const toggleSelect = (id: number) => {
        setCourses((prevCourses) =>
            prevCourses.map((course) =>
                course.id === id ? { ...course, isSelected: !course.isSelected } : course
            )
        );
    };


    const handleEditQuestion = () => {
        dispatch(setIsAddQuestion(true))
    }


    useEffect(() => {
        if (isAddQuestion) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isAddQuestion]);


    return (

        <>
            <div className="px-6 py-8 bg-white shadow-lg rounded-lg">
                <div className="flex items-center justify-between">
                    <div className="flex gap-x-2 items-center text-grey">
                        <div onClick={() => router.back()} className="flex gap-x-2 items-center">
                            <SubmitButton className='bg-white hover:bg-inherit text-black border p-2'>
                                <IoIosArrowBack size={20} />
                            </SubmitButton>
                            <GoHome className='cursor-pointer' size={20} />
                            <p className='cursor-pointer'>Pharmacies</p>
                        </div>
                        <MdKeyboardArrowRight />
                        <p className='text-[#3F4254]'>{pharmacy.name}</p>
                    </div>
                    <div className="flex gap-x-4 items-center">
                        <FileDownloadField title='Reports' />
                        <Image src="/delete-icon.svg" alt="" width={20} height={20} />
                    </div>
                </div>
                <div className="py-6 grid grid-cols-2 gap-x-20 items-center">
                    <div className="flex items-center gap-x-6">
                        <div>
                            <Image
                                src="/Ellipse.png"
                                alt="Profile Image"
                                className="rounded-full object-cover"
                                width={300}
                                height={300}
                            />
                        </div>

                        <div className="space-y-3 text-black w-full">
                            <h2 className="font-bold text-xl">{pharmacy.name}</h2>

                            <div className="flex justify-between">
                                <p className="text-[14px] font-medium">Total Expense</p>
                                <span className="text-[14px] font-medium">${pharmacy.name}</span>
                            </div>

                            <div className="flex justify-between">
                                <p className="text-[12px] font-semibold">Courses Completed</p>
                                <span className="text-[12px] font-semibold">{pharmacy.courses}</span>
                            </div>

                            <div className="w-full">
                                <div className="flex justify-between">
                                    <p className="text-[12px] font-semibold">Onboarding Checklist Progress</p>
                                    <span className="text-[12px] font-semibold">{pharmacy.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-[5px] mt-1">
                                    <div className="bg-primary h-[5px] rounded-full" style={{ width: `80%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-grey space-y-3 ">
                        <p>
                            <strong className='text-black'>Address:</strong> Lorem ipsum dolor sit amet consectetur, praesentium?
                        </p>
                        <p>
                            <strong className='text-black'>Email:</strong> JohnDoe@gmail.com
                        </p>
                        <p>
                            <strong className='text-black'>Contact:</strong> 123456789
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
                                <FileUploadField label="Licensing" title="Upload License" name="file" isMultiSelect={true} className='w-60 mb-6 border-primary' />
                            </Form>
                        )}
                    </Formik>
                    <Formik
                        initialValues={{ documents: [] }}
                        onSubmit={(values) => console.log(values)}
                    >
                        {() => (
                            <Form className='w-full'>
                                <FileUploadField label="Certifications" title="Upload Certification" name="file" isMultiSelect={true} className='w-60 border-primary' />
                            </Form>
                        )}
                    </Formik>

                </div>

            </div>



            {checklists.map((checklist, index) => (
                <div className="w-full mt-6  px-6 pt-8 pb-4 bg-white shadow-lg rounded-lg" key={index}>
                    <div className="flex flex-col gap-6">
                        <h1 className="text-lg mb-4">{checklist.name + " Checklist"}</h1>
                        <Accordion key={index} items={checklist.list} handleEditQuestion={handleEditQuestion} />
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
            {isAddQuestion && <AddNewQuestionModal />}
        </>
    )
}

export default PharmacyDetail

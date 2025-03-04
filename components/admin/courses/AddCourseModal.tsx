import { useDispatch } from "react-redux";
import { setIsAddCourse } from "@/store/features/course/courseSlice";
import Modal from "@/components/common/Modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddCourseModal = () => {
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(setIsAddCourse(false))
    }
    
    return (
        <Modal>
            <div className="bg-white p-8 w-96 rounded-lg h-full">
                <h1 className="text-2xl font-semibold pb-4">Add Course<Button onClick={handleClose} className="w-6 h-7 text-2xl text-white pb-2.5">x</Button></h1>
                <Input name="course" placeholder="Course Name" className="h-[42px] border-none shadow-lg rounded-lg" />
                <Button className="w-full h-[42px] bg-primary text-white mt-4">Add Course</Button>
            </div>
        </Modal>
    )
}

export default AddCourseModal;
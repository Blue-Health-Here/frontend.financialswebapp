import Modal from "../common/Modal"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

const AddCourseModal = () => {
    return (
        <Modal>
            <div className="bg-white p-8 w-96 rounded-lg h-full">
                <h1 className="text-2xl font-semibold pb-4">Add Course</h1>
                <Input name="course" placeholder="Course Name" className="h-[42px] border-none shadow-lg rounded-lg" />
                <Button className="w-full h-[42px] bg-primary text-white mt-4">Add Course</Button>
            </div>
        </Modal>
    )
}

export default AddCourseModal;
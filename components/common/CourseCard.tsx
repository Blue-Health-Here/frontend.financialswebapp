import Image from "next/image";
import deleteIcon from "../../public/delete-icon.svg"
import editIcon from "../../public/edit-icon.svg"


export const CourseCard = ({ courseName }: { courseName: string }) => {
    return (
        <div className="flex items-center justify-between bg-white p-4 border rounded-lg shadow-sm w-full max-w-md">
            <span className="">{courseName}</span>
            <div className="flex space-x-3 cursor-pointer">
                <Image src={deleteIcon} alt="" width={20} height={20} />
                <Image src={editIcon} alt="" width={20} height={20} />
            </div>
        </div>
    );
};

export default CourseCard;

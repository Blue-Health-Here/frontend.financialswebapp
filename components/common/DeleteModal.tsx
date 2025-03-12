import Image from "next/image";
import { Button } from "../ui/button";
import AlertModal from "./AlertModal";

type DeleteModalProps = {
    title: string;
    content?: string;
    handleClose?: () => void;
    handleSuccess?: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ title, content, handleClose, handleSuccess }) => {
    return (
        <AlertModal>
            <div className="bg-white rounded-3xl p-6 xl:p-8 w-96 text-center flex flex-col gap-2">
                <h1 className="text-3xl font-semibold pb-4">Delete {title}</h1>
                <div className="mx-auto">
                    <Image src="/Delete-Modal-image.svg" alt="delete modal image" className="" width={120} height={120} loading="lazy" />
                </div>
                {content && <p className="text-sm text-[#1C1C1CCC] whitespace-nowrap" dangerouslySetInnerHTML={{ __html: content }} />}
                <div className="flex justify-center space-x-4 mt-4 w-full">
                    <Button onClick={handleClose} className="bg-btnLight hover:bg-primaryRed flex-1 hover:text-white text-grey min-w-32 max-w-full rounded-full">No</Button>
                    <Button onClick={handleSuccess} className="bg-primaryRed hover:bg-btnLight flex-1 hover:text-grey text-white min-w-32 max-w-full rounded-full">Delete</Button>
                </div>
            </div>
        </AlertModal>
    )
}

export default DeleteModal;
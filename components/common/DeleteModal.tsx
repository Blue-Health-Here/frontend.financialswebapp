import Image from "next/image";
import { Button } from "../ui/button";
import AlertModal from "./AlertModal";

type DeleteModalProps = {
  title: string;
  content?: string;
  handleClose?: () => void;
  handleSuccess?: () => void;
};

const DeleteModal: React.FC<DeleteModalProps> = ({
  title,
  content,
  handleClose,
  handleSuccess,
}) => {
  return (
    <AlertModal>
      <div className="bg-white rounded-3xl p-3 md:p-6 xl:p-8 w-60 sm:w-96 text-center flex flex-col gap-2
        h-[35vh] sm:h-auto min-h-[200px] sm:min-h-[300px] max-h-[40vh] sm:max-h-none">
        <h1 className="text-base sm:text-3xl font-semibold pb-1 sm:pb-4">
          Delete {title}
        </h1>
        <div className="mx-auto">
          <Image
            src="/Delete-Modal-image.svg"
            alt="delete modal image"
            className="w-[50px] sm:w-[120px]"
            width={120}
            height={120}
            loading="lazy"
          />
        </div>
        {content && (
          <p
            className="text-[8px] sm:text-sm text-[#1C1C1CCC] whitespace-normal leading-tight"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
        <div className="flex justify-center space-x-4 mt-1 md:mt-4 w-full">
          <Button
            onClick={handleClose}
            className="bg-btnLight hover:bg-primaryRed flex-1 hover:text-white text-grey min-w-16 sm:min-w-32 max-w-full rounded-full text-xs sm:text-sm"
          >
            No
          </Button>
          <Button
            onClick={handleSuccess}
            className="bg-primaryRed hover:bg-btnLight flex-1 hover:text-grey text-white min-w-16 sm:min-w-32 max-w-full rounded-full text-xs sm:text-sm"
          >
            Delete
          </Button>
        </div>
      </div>
    </AlertModal>
  );
};

export default DeleteModal;

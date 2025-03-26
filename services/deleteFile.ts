import toast from "react-hot-toast";
import { AppDispatch } from "@/store/store";
import { deleteCourseUploadFile, deleteMarketingUploadFile } from "@/services/adminServices";

/**
 * Reusable file delete function that determines the correct API based on the module
 */
export const deleteUploadedFile = async (dispatch: AppDispatch, module: string, filename: string) => {
    try {
        switch (module) {
            case "marketing":
                await deleteMarketingUploadFile(dispatch, filename);
                break;
            case "course":
                await deleteCourseUploadFile(dispatch, filename);
                break;
            default:
                toast.error("Invalid module specified for file deletion.");
        }
    } catch (error: any) {
        toast.error(error?.message || "Failed to delete file.");
    }
};

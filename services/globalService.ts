import { axiosAdmin } from "@/lib/axiosAdmin";
import { setExpenseCategories, setIsLoading } from "@/store/features/global/globalSlice";
import { AppDispatch } from "@/store/store";
import toast from "react-hot-toast";

/**
 * fetch expense Categories and update Redux store.
 */
export const fetchExpenseCategories = async (dispatch: AppDispatch) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.get("/v1/categories?type=expense");
        if (response.status === 200) {
            dispatch(setExpenseCategories(response.data));
        }
    } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
    } finally {
        dispatch(setIsLoading(false));
    }
};
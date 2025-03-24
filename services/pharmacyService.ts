import axiosPharmacy from "@/lib/axiosPharmacy";
import { setIsLoading } from "@/store/features/global/globalSlice";
import { setExpenseStats } from "@/store/features/pharmacy/expense/pharmacyExpenseSlice";
import { AppDispatch } from "@/store/store";
import toast from "react-hot-toast";

/**
 * Fetch pharmacy stats and update Redux store.
 */
export const fetchPharmacyStats = async (dispatch: AppDispatch) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosPharmacy.get("/v1/pharmacy-expense");
        if (response.status === 200) {
            dispatch(setExpenseStats(response.data));
            console.log(response.data, 'response.data')
            toast.success("Stats fetched successfully!");
        }
    } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
    } finally {
        dispatch(setIsLoading(false));
    }
};
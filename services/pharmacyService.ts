import axiosPharmacy from "@/lib/axiosPharmacy";
import { setIsLoading } from "@/store/features/global/globalSlice";
import { setexpenseData } from "@/store/features/pharmacy/expense/pharmacyExpenseSlice";
import { AppDispatch } from "@/store/store";
import toast from "react-hot-toast";

/**
 * Fetch pharmacy stats and update Redux store.
 */
export const fetchPharmacyExpense = async (dispatch: AppDispatch) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosPharmacy.get("/v1/pharmacy-expense");
        if (response.status === 200) {
            dispatch(setexpenseData(response.data));
            console.log(response.data, 'response.data')
            toast.success("Stats fetched successfully!");
        }
    } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
    } finally {
        dispatch(setIsLoading(false));
    }
};


/**
 * create new expense and update Redux store.
 */
export const createNewPharmacyExpense = async (dispatch: AppDispatch, data: any) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosPharmacy.post("/v1/pharmacy-expense", data);
        if (response.data?.success) {
            await fetchPharmacyExpense(dispatch);
            toast.success("Expense created successfully!");
        }
    } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
    } finally {
        dispatch(setIsLoading(false));
    }
};


/**
 * update new expense  and update Redux store.
 */
export const updatePharmacyExpense = async (dispatch: AppDispatch, data: any) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosPharmacy.put("/v1/pharmacy-expense?expense_id="+data?.expense_id, data);
        if (response.data?.success) {
            await fetchPharmacyExpense(dispatch);
            toast.success("Expense updated successfully!");
        }
    } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
    } finally {
        dispatch(setIsLoading(false));
    }
};


/**
 * delete  expense  and update Redux store.
 */
export const deletePharmacyExpense = async (dispatch: AppDispatch, id?: string) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosPharmacy.delete("/v1/pharmacy-expense?expense_id="+id);
        if (response?.data?.success) {
            await fetchPharmacyExpense(dispatch);
            toast.success("Expense deleted successfully!");
        }
    } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
    } finally {
        dispatch(setIsLoading(false));
    }
};
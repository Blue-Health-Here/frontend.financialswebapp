import { axiosAdmin } from "@/lib/axiosAdmin";
import { setCourses } from "@/store/features/admin/course/adminCourseSlice";
import { setStats } from "@/store/features/admin/dashboard/adminDashboardSlice";
import { setPharmacies } from "@/store/features/admin/pharmacy/adminPharmacySlice";
import { setIsLoading } from "@/store/features/global/globalSlice";
import { AppDispatch } from "@/store/store";
import toast from "react-hot-toast";

/**
 * Fetch all stats and update Redux store.
 */
export const fetchAllStats = async (dispatch: AppDispatch) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.get("/v1/admin-statistics");
        if (response.status === 200) {
            dispatch(setStats(response.data));
            toast.success("Stats fetched successfully!");
        }
    } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
    }
};

/**
 * Fetch all pharmacies and update Redux store.
 */
export const fetchAllPharmacies = async (dispatch: AppDispatch) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.get("/v1/pharmacy-overview");
        if (response.status === 200) {
            dispatch(setPharmacies(response.data));
            toast.success("Pharmacies fetched successfully!");
        }
    } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
    }
};

/**
 * Fetch all courses and update Redux store.
 */
export const fetchAllCourses = async (dispatch: AppDispatch) => {
    try {
        const response = await axiosAdmin.get("/v1/courses");
        console.log(response, "courses listing api");
        if (response.status === 200) {
            dispatch(setCourses(response.data));
            toast.success("Courses fetched successfully!");
        }
    } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
    }
};

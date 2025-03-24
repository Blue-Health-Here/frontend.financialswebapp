import { axiosAdmin } from "@/lib/axiosAdmin";
import { setIsLoading, setProfileData } from "@/store/features/global/globalSlice";
import { AppDispatch } from "@/store/store";
import toast from "react-hot-toast";


/**
 * get pharmacy profile data and update Redux store.
 */
export const fetchProfileDataPharmacy = async (dispatch: AppDispatch) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.get("/v1/pharmacy-profile");
        if (response?.status === 200) {
            dispatch(setProfileData(response?.data[0]));
            toast.success("Profile fetched successfully!");
        }
    } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
    } finally {
        dispatch(setIsLoading(false));
    }
};

/**
 * post  pharmcy profile update and update Redux store.
 */
export const postProfileUpdatePharmacy = async (dispatch: AppDispatch, formData?: any) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.post("/v1/pharmacy-profile", formData, {
           
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        if (response?.data?.success) {
            await fetchProfileDataPharmacy(dispatch);
            toast.success("Profile updated successfully!");
        }
    } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
    } finally {
        dispatch(setIsLoading(false));
    }
};

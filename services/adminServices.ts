import { axiosAdmin } from "@/lib/axiosAdmin";
import { setCourses } from "@/store/features/admin/course/adminCourseSlice";
import { setStats } from "@/store/features/admin/dashboard/adminDashboardSlice";
import { setPharmacies } from "@/store/features/admin/pharmacy/adminPharmacySlice";
import { setIsLoading, setProfileData } from "@/store/features/global/globalSlice";
import { AppDispatch } from "@/store/store";
import toast from "react-hot-toast";
import { setMarketingMaterials } from "@/store/features/admin/marketing/adminMarketingSlice";

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
    } finally {
        dispatch(setIsLoading(false));
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
    } finally {
        dispatch(setIsLoading(false));
    }
};

/**
 * Fetch all courses and update Redux store.
 */
export const fetchAllCourses = async (dispatch: AppDispatch) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.get("/v1/courses");
        if (response.status === 200) {
            dispatch(setCourses(response.data));
            toast.success("Courses fetched successfully!");
        }
    } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
    } finally {
        dispatch(setIsLoading(false));
    }
};

/**
 * create new course and update Redux store.
 */
export const createNewCourse = async (dispatch: AppDispatch, data: any) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.post("/v1/courses", data);
        if (response.data?.success) {
            fetchAllCourses(dispatch);
            toast.success("Course created successfully!");
        }
    } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
    } finally {
        dispatch(setIsLoading(false));
    }
};

/**
 * update new course and update Redux store.
 */
export const updateCourse = async (dispatch: AppDispatch, data: any) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.put("/v1/courses?course_id="+data?.course_id, data);
        if (response.data?.success) {
            fetchAllCourses(dispatch);
            toast.success("Course updated successfully!");
        }
    } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
    } finally {
        dispatch(setIsLoading(false));
    }
};

/**
 * post courses upload file and update Redux store.
 */
export const postCoursesUploadFile = async (dispatch: AppDispatch, data: any) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.post("/v1/courses-upload-file", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        if (response?.data?.success) {
            toast.success("Course file uploaded successfully!");
            return { ...response?.data };
        }
        return null;
    } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
    } finally {
        dispatch(setIsLoading(false));
    }
};

/**
 * delete course and update Redux store.
 */
export const deleteCourse = async (dispatch: AppDispatch, id?: string) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.delete("/v1/courses?course_id="+id);
        if (response?.data?.success) {
            fetchAllCourses(dispatch);
            toast.success("Course deleted successfully!");
        }
    } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
    } finally {
        dispatch(setIsLoading(false));
    }
};

/**
 * get profile data and update Redux store.
 */
export const fetchProfileData = async (dispatch: AppDispatch) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.get("/v1/admin-profile");
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
 * post profile update and update Redux store.
 */
export const postProfileUpdate = async (dispatch: AppDispatch, formData?: any) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.post("/v1/admin-profile", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        if (response?.data?.success) {
            fetchProfileData(dispatch);
            toast.success("Profile updated successfully!");
        }
    } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
    } finally {
        dispatch(setIsLoading(false));
    }
};

/**
 * Fetch all marketing materials and update Redux store.
 */
export const fetchAllMarketingMaterials = async (dispatch: AppDispatch) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.get("/v1/admin-marketing");
        if (response.status === 200) {
            dispatch(setMarketingMaterials(response.data));
            toast.success("Marketing Materials fetched successfully!");
        }
    } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
    } finally {
        dispatch(setIsLoading(false));
    }
};

/**
 * create new course and update Redux store.
 */
export const createNewMarketingMaterials = async (dispatch: AppDispatch, data: any) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.post("/v1/admin-marketing", data);
        if (response.data?.success) {
            fetchAllMarketingMaterials(dispatch);
            toast.success("Marketing Material created successfully!");
        }
    } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
    } finally {
        dispatch(setIsLoading(false));
    }
};

export const updateMarketingMaterials = async (dispatch: AppDispatch, data: any) => {
    try {
        dispatch(setIsLoading(true));
        console.log("Edit marketing material:","/v1/admin-marketing?marketing_id="+data?.marketing_id, data )
        const response = await axiosAdmin.put("/v1/admin-marketing?marketing_id="+data?.marketing_id, data);
        if (response.data?.success) {
            fetchAllMarketingMaterials(dispatch);
            toast.success("Marketing Material updated successfully!");
        }
    } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
    } finally {
        dispatch(setIsLoading(false));
    }
};

export const deleteMarketingMaterials = async (dispatch: AppDispatch, id?: string) => {
    try {
        dispatch(setIsLoading(true));
        console.log("Deleting marketing material:", "/v1/admin-marketing?marketing_id="+id);
        const response = await axiosAdmin.delete("/v1/admin-marketing?market_id="+id);
        if (response?.data?.success) {
            fetchAllMarketingMaterials(dispatch);
            toast.success("Marketing Material deleted successfully!");
        }
    } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
    } finally {
        dispatch(setIsLoading(false));
    }
};


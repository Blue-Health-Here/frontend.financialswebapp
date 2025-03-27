import { axiosAdmin } from "@/lib/axiosAdmin";
import { setSelectCategories } from "@/store/features/admin/category/adminCategorySlice";
import { setCourses } from "@/store/features/admin/course/adminCourseSlice";
import { setStats } from "@/store/features/admin/dashboard/adminDashboardSlice";
import { setPharmacies } from "@/store/features/admin/pharmacy/adminPharmacySlice";
import { setIsLoading, setProfileData,setLicenseData,setCertificationsData , setPharmacyDetailsData} from "@/store/features/global/globalSlice";
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
            await fetchAllCourses(dispatch);
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
            await fetchAllCourses(dispatch);
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
            await fetchAllCourses(dispatch);
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
            await fetchProfileData(dispatch);
            toast.success("Profile updated successfully!");
        }
    } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
    } finally {
        dispatch(setIsLoading(false));
    }
};

/**
 * fetch all Categories and update Redux store.
 */
export const fetchAllCategories = async (dispatch: AppDispatch, type: string) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.get("/v1/admin-categories?type="+type);
        if (response.status === 200) {
            dispatch(setSelectCategories(response.data));
            toast.success("Categories fetched successfully!");
        }
    } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
    } finally {
        dispatch(setIsLoading(false));
    }
};

/**
 * create new category and update Redux store.
 */
export const createNewCategory= async (dispatch: AppDispatch, data: any) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.post("/v1/admin-categories", data);
        if (response.data?.success) {
            await fetchAllCategories(dispatch, data.category_type);
            toast.success("Category created successfully!");
        }
    } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
    } finally {
        dispatch(setIsLoading(false));
    }
};


/**
 * delete category and update Redux store.
 */
export const deleteCategory = async (dispatch: AppDispatch, id: string, type: string) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.delete("/v1/admin-categories?id="+id);
        if (response?.data?.success) {
            await fetchAllCategories(dispatch, type);
            toast.success("Category deleted successfully!");
        }
    } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
    } finally {
        dispatch(setIsLoading(false));
    }
};


/**
 * update category and update Redux store.
 */
export const updateCategory = async (dispatch: AppDispatch, data: any,) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.put("/v1/admin-categories?category_id="+data?.category_id, data);
        if (response.data?.success) {
            await fetchAllCategories(dispatch,data.category_type);
            toast.success("Category Update successfully!");
        }
    } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
    } finally {
        dispatch(setIsLoading(false));
    }
};

/**
 * get padmin license data and update Redux store.
 */
export const fetchAdminLicense = async (dispatch: AppDispatch, id?: string) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.get("/v1/admin-pharmacy-license?pharmacy_id="+id);
        if (response?.status === 200) {
            dispatch(setLicenseData(response?.data));
            toast.success("License fetched successfully!");
        }
    } catch (error: any) {  
        toast.error(error?.response?.data?.detail || "Something went wrong");
    } finally {
        dispatch(setIsLoading(false));
    }
};

/**
 * post admin license upload file and update Redux store.
 */
export const postAdminLicenseUploadFile = async (dispatch: AppDispatch, data: any,id?: string) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.post("/v1/admin-pharmacy-license?pharmacy_id="+id, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        if (response?.data?.success) {
            toast.success("License file uploaded successfully!");
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
 * delete admin license and update Redux store.
 */
export const deleteAdminLicense = async (dispatch: AppDispatch, id?: string) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.delete("/v1/admin-pharmacy-license?license_id="+id);
        if (response?.data?.success) {
            await fetchAdminLicense(dispatch);
            toast.success("License file deleted successfully!");
        }
    } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
    } finally {
        dispatch(setIsLoading(false));
    }
};

/**
 * get admin certification data and update Redux store.
 */
export const fetchAdminCertification = async (dispatch: AppDispatch, id?: string) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.get("/v1/admin-pharmacy-certification?pharmacy_id="+id);
        if (response?.status === 200) {
            dispatch(setCertificationsData(response?.data));
            toast.success("Certification fetched successfully!");
        }
    } catch (error: any) {  
        toast.error(error?.response?.data?.detail || "Something went wrong");
    } finally {
        dispatch(setIsLoading(false));
    }
};

/**
 * post admin certification upload file and update Redux store.
 */
export const postAdminCertificationUploadFile = async (dispatch: AppDispatch, data: any,id?: string) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.post("/v1/admin-pharmacy-certification?pharmacy_id="+id, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        if (response?.data?.success) {
            toast.success("Certification file uploaded successfully!");
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
 * delete admin certification and update Redux store.
 */
export const deleteAdminCertification = async (dispatch: AppDispatch, id?: string) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.delete("/v1/admin-pharmacy-certification?certification_id="+id);
        if (response?.data?.success) {
            await fetchAdminLicense(dispatch);
            toast.success("Certification file deleted successfully!");
        }
    } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
    } finally {
        dispatch(setIsLoading(false));
    }
};

/**
 * get admin pharmacy details data and update Redux store.
 */
export const fetchAdminPharmacyDetails = async (dispatch: AppDispatch, id?: string) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.get("/v1/pharmacy-details?pharmacy_id="+id);
        if (response?.status === 200) {
            dispatch(setPharmacyDetailsData(response?.data));
            toast.success("pharmacy details fetched successfully!");
        }
    } catch (error: any) {  
        toast.error(error?.response?.data?.detail || "Something went wrong");
    } finally {
        dispatch(setIsLoading(false));
    }
};










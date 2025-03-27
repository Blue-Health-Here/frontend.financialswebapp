import { axiosAdmin } from "@/lib/axiosAdmin";
import { setSelectCategories } from "@/store/features/admin/category/adminCategorySlice";
import { setCourses } from "@/store/features/admin/course/adminCourseSlice";
import { setStats } from "@/store/features/admin/dashboard/adminDashboardSlice";
import { setPharmacies } from "@/store/features/admin/pharmacy/adminPharmacySlice";
import { setIsLoading, setProfileData } from "@/store/features/global/globalSlice";
import { AppDispatch } from "@/store/store";
import toast from "react-hot-toast";
import { setMarketingMaterials } from "@/store/features/admin/marketing/adminMarketingSlice";
import { setExpenseData, setPharmacyList } from "@/store/features/admin/expense/adminExpenseSlice";

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
        if(error?.status === 404){
            toast.success(error?.response?.data?.detail)
        }else{
            toast.error(error?.message || "Something went wrong");
        }
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
        if(error?.status === 404){
            toast.success(error?.response?.data?.detail)
        }else{
            toast.error(error?.message || "Something went wrong");
        }
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
        if(error?.status === 404){
            toast.success(error?.response?.data?.detail)
        }else{
            toast.error(error?.message || "Something went wrong");
        }
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
 * post courses uploaded file and update Redux store.
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
 * delete courses uploaded file and update Redux store.
 */
export const deleteCourseUploadFile = async (dispatch: AppDispatch, filename: string) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.delete("/v1/admin-delete-course-file?filename="+filename);
        if (response?.data?.success) {
            toast.success("File deleted successfully!");
        }
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
        if(error?.status === 404){
            toast.success(error?.response?.data?.detail)
        }else{
            toast.error(error?.message || "Something went wrong");
        }
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
 * fetch all marketing materials and update Redux store.
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
        if(error?.status === 404){
            toast.success(error?.response?.data?.detail)
        }else{
            toast.error(error?.message || "Something went wrong");
        }
    } finally {
        dispatch(setIsLoading(false));
    }
};

/**
 * create new marketing materials and update Redux store.
 */
export const createNewMarketingMaterials = async (dispatch: AppDispatch, data: any) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.post("/v1/admin-marketing", data);
        if (response.data?.success) {
            await fetchAllMarketingMaterials(dispatch);
            toast.success("Marketing Material created successfully!");
        }
    } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
    } finally {
        dispatch(setIsLoading(false));
    }
};

/**
 * update marketing materials and update Redux store.
 */
export const updateMarketingMaterials = async (dispatch: AppDispatch, data: any) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.put("/v1/admin-marketing?marketing_id="+data?.marketing_id, data);
        if (response.data?.success) {
            await fetchAllMarketingMaterials(dispatch);
            toast.success("Marketing Material updated successfully!");
        }
    } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
    } finally {
        dispatch(setIsLoading(false));
    }
};

/**
 * post marketing materials upload file and update Redux store.
 */
export const postMarketingUploadFile = async (dispatch: AppDispatch, data: any) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.post("/v1/admin-marketing-upload-file", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        if (response?.data?.success) {
            toast.success("Marketing material file uploaded successfully!");
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
 * delete marketing materials uploaded file and update Redux store.
 */
export const deleteMarketingUploadFile = async (dispatch: AppDispatch, filename: string) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.delete("/v1/admin-delete-marketing-file?filename="+filename);
        if (response?.data?.success) {
            toast.success("File deleted successfully!");
        }
    } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
    } finally {
        dispatch(setIsLoading(false));
    }
};

/**
 * delete marketing materials and update Redux store.
 */
export const deleteMarketingMaterials = async (dispatch: AppDispatch, id?: string) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.delete("/v1/admin-marketing?market_id="+id);
        if (response?.data?.success) {
            await fetchAllMarketingMaterials(dispatch);
            toast.success("Marketing Material deleted successfully!");
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
        if(error?.status === 404){
            toast.success(error?.response?.data?.detail)
        }else{
            toast.error(error?.message || "Something went wrong");
        }
    } finally {
        dispatch(setIsLoading(false));
    }
};

/**
 * create new category and update Redux store.
 */
export const createNewCategory = async (dispatch: AppDispatch, data: any) => {
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
 * fetch all pharmacies budgeting list and update Redux store.
 */
export const fetchBudgetingList = async (dispatch: AppDispatch) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.get("/v1/admin-budget");
        if (response.status === 200) {
            dispatch(setPharmacyList(response.data));
            toast.success("Pharmacies budgeting list fetched successfully!");
        }
    } catch (error: any) {
        if(error?.status === 404){
            toast.success(error?.response?.data?.detail)
        }else{
            toast.error(error?.message || "Something went wrong");
        }
    } finally {
        dispatch(setIsLoading(false));
    }
};

/**
 * fetch all pharmacies budgeting list and update Redux store.
 */
export const fetchAdminExpense = async (dispatch: AppDispatch, id:any) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.get("/v1/admin-expense?pharmacy_id="+id);
        if (response.status === 200) {
            dispatch(setExpenseData(response.data));
            toast.success("Expense fetched successfully!");
        }
    } catch (error: any) {
        if(error?.status === 404){
            toast.success(error?.response?.data?.detail)
        }else{
            toast.error(error?.message || "Something went wrong");
        }
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
        const response = await axiosAdmin.post("/v1/admin-expense", data);
        if (response.data?.success) {
            await fetchAdminExpense(dispatch,data.pharmacy_id);
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
        const response = await axiosAdmin.put("/v1/admin-expense?expense_id="+data?.expense_id, data);
        if (response.data?.success) {
            await fetchAdminExpense(dispatch,data.pharmacy_id);
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
        const response = await axiosAdmin.delete("/v1/admin-expense?expense_id="+id);
        if (response?.data?.success) {
            toast.success("Expense deleted successfully!");
        }
    } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
    } finally {
        dispatch(setIsLoading(false));
    }
};

/**
 * Fetch all stats and update Redux store.
 */
export const fetchAdminExpenseStats = async (dispatch: AppDispatch, id: any) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.get("/v1/admin-expense-stats?pharmacy_id="+id);
        if (response.status === 200) {
            dispatch(setStats(response.data));
            toast.success("Stats fetched successfully!");
        }
    } catch (error: any) {
        if(error?.status === 404){
            toast.success(error?.response?.data?.detail)
        }else{
            toast.error(error?.message || "Something went wrong");
        }
    } finally {
        dispatch(setIsLoading(false));
    }
};

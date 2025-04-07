import { axiosAdmin } from "@/lib/axiosAdmin";
import { setIsLoading, setProfileData, setLicenseData ,setCertificationsData, setPharmacyStatsData, setExpenseGraphData } from "@/store/features/global/globalSlice";
import { setPharmacyCourses } from "@/store/features/pharmacy/course/pharmacyCourseSlice";
import { setexpenseData, setPharmacyExpenseStats } from "@/store/features/pharmacy/expense/pharmacyExpenseSlice";
import { setPharmacyMarketingMaterials } from "@/store/features/pharmacy/marketing/pharmacyMarketingSlice";
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
            dispatch(setProfileData(response?.data));
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

/**
 * get pharmacy license data and update Redux store.
 */
export const fetchPharmacyLicense = async (dispatch: AppDispatch) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.get("/v1/pharmacy-license");
        if (response?.status === 200) {
            dispatch(setLicenseData(response?.data));
            toast.success("License fetched successfully!");
        }
    } catch (error: any) {  
        if(error?.status === 404){
            toast.success(error?.response?.data?.detail)
            dispatch(setLicenseData([]));
        }else{
            toast.error(error?.message || "Something went wrong");
        }
    } finally {
        dispatch(setIsLoading(false));
    }
};

/**
 * post pharmacy license upload file and update Redux store.
 */
export const postLicenseUploadFile = async (dispatch: AppDispatch, data: any) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.post("/v1/pharmacy-license", data, {
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
 * delete pharmacy license and update Redux store.
 */
export const deletePharmacyLicense = async (dispatch: AppDispatch, id?: string) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.delete("/v1/pharmacy-license?license_id="+id);
        if (response?.data?.success) {
            await fetchPharmacyLicense(dispatch);
            toast.success("License file deleted successfully!");
        }
    } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
    } finally {
        dispatch(setIsLoading(false));
    }
};

/**
 * get pharmacy certifications data and update Redux store.
 */
export const fetchPharmacyCertifications = async (dispatch: AppDispatch) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.get("/v1/pharmacy-certification");
        if (response?.status === 200) {
            dispatch(setCertificationsData(response?.data));
            toast.success("Certificate fetched successfully!");
        }
    } catch (error: any) {
        if(error?.status === 404){
            toast.success(error?.response?.data?.detail)
            dispatch(setCertificationsData([]));
        }else{
            toast.error(error?.message || "Something went wrong");
        }
    } finally {
        dispatch(setIsLoading(false));
    }
};

/**
 * post pharmacy certification upload file and update Redux store.
 */
export const postCertificationsUploadFile = async (dispatch: AppDispatch, data: any) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.post("/v1/pharmacy-certification", data, {
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
 * delete pharmacy certification and update Redux store.
 */
export const deletePharmacyCertification = async (dispatch: AppDispatch, id?: string) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.delete("/v1/pharmacy-certification?certification_id="+id);
        if (response?.data?.success) {
            await fetchPharmacyCertifications(dispatch);
            toast.success("Certification file deleted successfully!");
        }
    } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
    } finally {
        dispatch(setIsLoading(false));
    }
};


/**
 * Fetch pharmacy stats and update Redux store.
 */
export const fetchPharmacyExpense = async (dispatch: AppDispatch) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.get("/v1/pharmacy-expense");
        if (response.status === 200) {
            dispatch(setexpenseData(response.data));
            toast.success("Expense fetched successfully!");
        }
    } catch (error: any) {
        if(error?.status === 404){
            toast.success(error?.response?.data?.detail)
            dispatch(setexpenseData([]));
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
        const response = await axiosAdmin.post("/v1/pharmacy-expense", data);
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
        const response = await axiosAdmin.put("/v1/pharmacy-expense?expense_id="+data?.expense_id, data);
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
        const response = await axiosAdmin.delete("/v1/pharmacy-expense?expense_id="+id);
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

/**
 * get pharmacy dashboard stats data and update Redux store.
 */
export const fetchPharmacyDashboardStats = async (dispatch: AppDispatch) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.get("/v1/pharmacy-stats");
        if (response?.status === 200) {
            dispatch(setPharmacyStatsData(response?.data));
            toast.success("Stats fetched successfully!");
        }
    } catch (error: any) {  
        if(error?.status === 404){
            toast.success(error?.response?.data?.detail)
            dispatch(setPharmacyStatsData([]));
        }else{
            toast.error(error?.message || "Something went wrong");
        }
    } finally {
        dispatch(setIsLoading(false));
    }
};

/*
 * Fetch all stats and update Redux store.
 */
export const fetchPharmacyExpenseStats = async (dispatch: AppDispatch) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.get("/v1/pharmacy-expense-stats");
        if (response.status === 200) {
            dispatch(setPharmacyExpenseStats(response.data));
            toast.success("Stats fetched successfully!");
        }
    } catch (error: any) {
        if(error?.status === 404){
            toast.success(error?.response?.data?.detail)
            dispatch(setPharmacyExpenseStats([]));
        }else{
            toast.error(error?.message || "Something went wrong");
        }
    } finally {
        dispatch(setIsLoading(false));
    }
};

/*
* Fetch pharmacy dashboard expense graph and update Redux store.
*/
export const fetchPharmacyExpenseGraph = async (dispatch: AppDispatch) => {
   try {
       dispatch(setIsLoading(true));
       const response = await axiosAdmin.get("/v1/pharmacy-expense-graph");
       if (response.status === 200) {
           dispatch(setExpenseGraphData(response.data));
           toast.success("Expense Graph fetched successfully!");
       }
   } catch (error: any) {
       if(error?.status === 404){
           toast.success(error?.response?.data?.detail)
           dispatch(setExpenseGraphData([]));
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
export const fetchAllPharmacyCourses = async (dispatch: AppDispatch) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.get("/v1/pharmacy-courses");
        if (response.status === 200) {
            dispatch(setPharmacyCourses(response.data));
            toast.success("Courses fetched successfully!");
        }
    } catch (error: any) {
        if(error?.status === 404){
            toast.success(error?.response?.data?.detail)
            dispatch(setPharmacyCourses([]));
        }else{
            toast.error(error?.message || "Something went wrong");
        }
    } finally {
        dispatch(setIsLoading(false));
    }
};


/**
 * fetch all marketing materials and update Redux store.
 */
export const fetchAllPharmacyMarketingMaterials = async (dispatch: AppDispatch) => {
    try {
        dispatch(setIsLoading(true));
        const response = await axiosAdmin.get("/v1/pharmacy-marketing");
        if (response.status === 200) {
            dispatch(setPharmacyMarketingMaterials(response.data));
            toast.success("Marketing Materials fetched successfully!");
        }
    } catch (error: any) {
        if(error?.status === 404){
            toast.success(error?.response?.data?.detail)
            dispatch(setPharmacyMarketingMaterials([]));
        }else{
            toast.error(error?.message || "Something went wrong");
        }
    } finally {
        dispatch(setIsLoading(false));
    }
};
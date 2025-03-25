import { axiosAdmin } from "@/lib/axiosAdmin";
import { setIsLoading, setProfileData, setLicenseData ,setCertificationsData} from "@/store/features/global/globalSlice";
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
        toast.error(error?.response?.data?.detail || "Something went wrong");
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
        toast.error(error?.response?.data?.detail || "Something went wrong");
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

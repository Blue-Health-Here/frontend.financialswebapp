import { axiosAdmin } from "@/lib/axiosAdmin";
import { setSelectCategories } from "@/store/features/admin/category/adminCategorySlice";
import { setCourses } from "@/store/features/admin/course/adminCourseSlice";
import { setStats } from "@/store/features/admin/dashboard/adminDashboardSlice";
import { setPharmacies } from "@/store/features/admin/pharmacy/adminPharmacySlice";
import { setMarketingMaterials } from "@/store/features/admin/marketing/adminMarketingSlice";
import { setAdminExpenseStats, setAdminExpenseData, setPharmacyList } from "@/store/features/admin/expense/adminExpenseSlice";
import {
  setIsLoading,
  setProfileData,
  setLicenseData,
  setCertificationsData,
  setPharmacyDetailsData
} from "@/store/features/global/globalSlice";
import { AppDispatch } from "@/store/store";
import toast from "react-hot-toast";

// Types
type ApiMethod = 'get' | 'post' | 'put' | 'delete';
type ApiResponse<T = any> = {
  data?: T & { success?: boolean };
  status?: number;
};
type ErrorResponse = {
  message?: string;
  status?: number;
  response?: { data?: { detail?: string } };
};

// Generic API handler that centralizes common logic
const apiHandler = async <T = any>(
  dispatch: AppDispatch,
  method: ApiMethod,
  endpoint: string,
  options: {
    data?: any;
    params?: Record<string, string | undefined>;
    successMessage?: string;
    errorMessage?: string;
    onSuccess?: (data: T) => void;
    onError?: (error: ErrorResponse) => void;
    isFormData?: boolean;
  }
): Promise<T | null> => {
  const {
    data,
    params,
    successMessage,
    errorMessage = "Something went wrong",
    onSuccess,
    onError,
    isFormData = false,
  } = options;

  try {
    dispatch(setIsLoading(true));
    
    // Build URL with query parameters if needed
    let url = endpoint;
    if (params) {
      const queryParams = Object.entries(params)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
      
      url = queryParams ? `${endpoint}?${queryParams}` : endpoint;
    }
    
    // Configure request
    const config: any = {};
    if (isFormData) {
      config.headers = { "Content-Type": "multipart/form-data" };
    }
    
    // Make API call
    let response: ApiResponse<T>;
    
    switch (method) {
      case 'get':
        response = await axiosAdmin.get(url, config);
        break;
      case 'post':
        response = await axiosAdmin.post(url, data, config);
        break;
      case 'put':
        response = await axiosAdmin.put(url, data, config);
        break;
      case 'delete':
        response = await axiosAdmin.delete(url, config);
        break;
    }
    
    // Handle success
    if (response?.status === 200 || response?.data?.success) {
      if (successMessage) {
        toast.success(successMessage);
      }
      
      if (onSuccess && response.data) {
        onSuccess(response.data);
      }
      
      return response.data || null;
    }
    
    return null;
  } catch (error: any) {
    // Handle 404 differently in some cases
    if (error?.status === 404) {
      if (error?.response?.data?.detail) {
        toast.success(error.response.data.detail);
      }
      
      if (onError) {
        onError(error);
      }
    } else {
      // Handle other errors
      toast.error(error?.message || errorMessage);
      
      if (onError) {
        onError(error);
      }
    }
    
    return null;
  } finally {
    dispatch(setIsLoading(false));
  }
};

// ============= DASHBOARD & STATS =============

export const fetchAllStats = async (dispatch: AppDispatch) => {
  return apiHandler(dispatch, 'get', '/v1/admin-statistics', {
    successMessage: "Stats fetched successfully!",
    onSuccess: (data) => dispatch(setStats(data)),
    onError: () => dispatch(setStats(null))
  });
};

export const fetchAdminExpenseStats = async (dispatch: AppDispatch, id: string) => {
  return apiHandler(dispatch, 'get', '/v1/admin-expense-stats', {
    params: { pharmacy_id: id },
    successMessage: "Stats fetched successfully!",
    onSuccess: (data) => dispatch(setAdminExpenseStats(data))
  });
};

// ============= PHARMACY MANAGEMENT =============

export const fetchAllPharmacies = async (dispatch: AppDispatch) => {
  return apiHandler(dispatch, 'get', '/v1/pharmacy-overview', {
    successMessage: "Pharmacies fetched successfully!",
    onSuccess: (data) => dispatch(setPharmacies(data)),
    onError: () => dispatch(setPharmacies([]))
  });
};

export const fetchBudgetingList = async (dispatch: AppDispatch) => {
  return apiHandler(dispatch, 'get', '/v1/admin-budget', {
    successMessage: "Pharmacies budgeting list fetched successfully!",
    onSuccess: (data) => dispatch(setPharmacyList(data)),
    onError: () => dispatch(setPharmacyList([]))
  });
};

export const fetchAdminPharmacyDetails = async (dispatch: AppDispatch, id?: string) => {
  return apiHandler(dispatch, 'get', '/v1/pharmacy-details', {
    params: { pharmacy_id: id },
    successMessage: "Pharmacy details fetched successfully!",
    onSuccess: (data) => dispatch(setPharmacyDetailsData(data))
  });
};

// ============= COURSES =============

export const fetchAllCourses = async (dispatch: AppDispatch) => {
  return apiHandler(dispatch, 'get', '/v1/courses', {
    successMessage: "Courses fetched successfully!",
    onSuccess: (data) => dispatch(setCourses(data)),
    onError: () => dispatch(setCourses([]))
  });
};

export const createNewCourse = async (dispatch: AppDispatch, data: any) => {
  return apiHandler(dispatch, 'post', '/v1/courses', {
    data,
    successMessage: "Course created successfully!",
    onSuccess: () => fetchAllCourses(dispatch)
  });
};

export const updateCourse = async (dispatch: AppDispatch, data: any) => {
  return apiHandler(dispatch, 'put', '/v1/courses', {
    params: { course_id: data?.course_id },
    data,
    successMessage: "Course updated successfully!",
    onSuccess: () => fetchAllCourses(dispatch)
  });
};

export const deleteCourse = async (dispatch: AppDispatch, id?: string) => {
  return apiHandler(dispatch, 'delete', '/v1/courses', {
    params: { course_id: id },
    successMessage: "Course deleted successfully!",
    onSuccess: () => fetchAllCourses(dispatch)
  });
};

export const postCoursesUploadFile = async (dispatch: AppDispatch, data: any) => {
  return apiHandler(dispatch, 'post', '/v1/courses-upload-file', {
    data,
    isFormData: true,
    successMessage: "Course file uploaded successfully!"
  });
};

export const deleteCourseUploadFile = async (dispatch: AppDispatch, filename: string) => {
  return apiHandler(dispatch, 'delete', '/v1/admin-delete-course-file', {
    params: { filename },
    successMessage: "File deleted successfully!"
  });
};

// ============= PROFILE MANAGEMENT =============

export const fetchProfileData = async (dispatch: AppDispatch) => {
  return apiHandler(dispatch, 'get', '/v1/admin-profile', {
    successMessage: "Profile fetched successfully!",
    onSuccess: (data) => dispatch(setProfileData(data)),
    onError: () => dispatch(setProfileData(null))
  });
};

export const postProfileUpdate = async (dispatch: AppDispatch, formData?: any) => {
  return apiHandler(dispatch, 'post', '/v1/admin-profile', {
    data: formData,
    isFormData: true,
    successMessage: "Profile updated successfully!",
    onSuccess: () => fetchProfileData(dispatch)
  });
};

// ============= MARKETING MATERIALS =============

export const fetchAllMarketingMaterials = async (dispatch: AppDispatch) => {
  return apiHandler(dispatch, 'get', '/v1/admin-marketing', {
    successMessage: "Marketing Materials fetched successfully!",
    onSuccess: (data) => dispatch(setMarketingMaterials(data)),
    onError: () => dispatch(setMarketingMaterials([]))
  });
};

export const createNewMarketingMaterials = async (dispatch: AppDispatch, data: any) => {
  return apiHandler(dispatch, 'post', '/v1/admin-marketing', {
    data,
    successMessage: "Marketing Material created successfully!",
    onSuccess: () => fetchAllMarketingMaterials(dispatch)
  });
};

export const updateMarketingMaterials = async (dispatch: AppDispatch, data: any) => {
  return apiHandler(dispatch, 'put', '/v1/admin-marketing', {
    params: { marketing_id: data?.marketing_id },
    data,
    successMessage: "Marketing Material updated successfully!",
    onSuccess: () => fetchAllMarketingMaterials(dispatch)
  });
};

export const deleteMarketingMaterials = async (dispatch: AppDispatch, id?: string) => {
  return apiHandler(dispatch, 'delete', '/v1/admin-marketing', {
    params: { market_id: id },
    successMessage: "Marketing Material deleted successfully!",
    onSuccess: () => fetchAllMarketingMaterials(dispatch)
  });
};

export const postMarketingUploadFile = async (dispatch: AppDispatch, data: any) => {
  return apiHandler(dispatch, 'post', '/v1/admin-marketing-upload-file', {
    data,
    isFormData: true,
    successMessage: "Marketing material file uploaded successfully!"
  });
};

export const deleteMarketingUploadFile = async (dispatch: AppDispatch, filename: string) => {
  return apiHandler(dispatch, 'delete', '/v1/admin-delete-marketing-file', {
    params: { filename },
    successMessage: "File deleted successfully!"
  });
};

// ============= CATEGORIES =============

export const fetchAllCategories = async (dispatch: AppDispatch, type: string) => {
  return apiHandler(dispatch, 'get', '/v1/admin-categories', {
    params: { type },
    successMessage: "Categories fetched successfully!",
    onSuccess: (data) => dispatch(setSelectCategories(data)),
    onError: () => dispatch(setSelectCategories([]))
  });
};

export const createNewCategory = async (dispatch: AppDispatch, data: any) => {
  return apiHandler(dispatch, 'post', '/v1/admin-categories', {
    data,
    successMessage: "Category created successfully!",
    onSuccess: () => fetchAllCategories(dispatch, data.category_type)
  });
};

export const updateCategory = async (dispatch: AppDispatch, data: any) => {
  return apiHandler(dispatch, 'put', '/v1/admin-categories', {
    params: { category_id: data?.category_id },
    data,
    successMessage: "Category updated successfully!",
    onSuccess: () => fetchAllCategories(dispatch, data.category_type)
  });
};

export const deleteCategory = async (dispatch: AppDispatch, id: string, type: string) => {
  return apiHandler(dispatch, 'delete', '/v1/admin-categories', {
    params: { id },
    successMessage: "Category deleted successfully!",
    onSuccess: () => fetchAllCategories(dispatch, type)
  });
};

// ============= EXPENSES =============

export const fetchAdminExpense = async (dispatch: AppDispatch, id: string) => {
  return apiHandler(dispatch, 'get', '/v1/admin-expense', {
    params: { pharmacy_id: id },
    successMessage: "Expense fetched successfully!",
    onSuccess: (data) => dispatch(setAdminExpenseData(data)),
    onError: () => dispatch(setAdminExpenseData([]))
  });
};

export const createNewAdminPharmacyExpense = async (dispatch: AppDispatch, data: any) => {
  return apiHandler(dispatch, 'post', '/v1/admin-expense', {
    data,
    successMessage: "Expense created successfully!",
    onSuccess: () => fetchAdminExpense(dispatch, data.pharmacy_id)
  });
};

export const updateAdminPharmacyExpense = async (dispatch: AppDispatch, data: any) => {
  return apiHandler(dispatch, 'put', '/v1/admin-expense', {
    params: { expense_id: data?.expense_id },
    data,
    successMessage: "Expense updated successfully!",
    onSuccess: () => fetchAdminExpense(dispatch, data.pharmacy_id)
  });
};

export const deleteAdminPharmacyExpense = async (dispatch: AppDispatch, id?: string) => {
  return apiHandler(dispatch, 'delete', '/v1/admin-expense', {
    params: { expense_id: id },
    successMessage: "Expense deleted successfully!"
  });
};

// ============= LICENSING & CERTIFICATION =============

export const fetchAdminLicense = async (dispatch: AppDispatch, id?: string) => {
  return apiHandler(dispatch, 'get', '/v1/admin-pharmacy-license', {
    params: { pharmacy_id: id },
    successMessage: "License fetched successfully!",
    onSuccess: (data) => dispatch(setLicenseData(data)),
    onError: () => dispatch(setLicenseData([]))
  });
};

export const postAdminLicenseUploadFile = async (dispatch: AppDispatch, data: any, id?: string) => {
  return apiHandler(dispatch, 'post', '/v1/admin-pharmacy-license', {
    params: { pharmacy_id: id },
    data,
    isFormData: true,
    successMessage: "License file uploaded successfully!"
  });
};

export const deleteAdminLicense = async (dispatch: AppDispatch, id?: string) => {
  return apiHandler(dispatch, 'delete', '/v1/admin-pharmacy-license', {
    params: { license_id: id },
    successMessage: "License file deleted successfully!"
  });
};

export const fetchAdminCertification = async (dispatch: AppDispatch, id?: string) => {
  return apiHandler(dispatch, 'get', '/v1/admin-pharmacy-certification', {
    params: { pharmacy_id: id },
    successMessage: "Certification fetched successfully!",
    onSuccess: (data) => dispatch(setCertificationsData(data)),
    onError: () => dispatch(setCertificationsData([]))
  });
};

export const postAdminCertificationUploadFile = async (dispatch: AppDispatch, data: any, id?: string) => {
  return apiHandler(dispatch, 'post', '/v1/admin-pharmacy-certification', {
    params: { pharmacy_id: id },
    data,
    isFormData: true,
    successMessage: "Certification file uploaded successfully!"
  });
};

export const deleteAdminCertification = async (dispatch: AppDispatch, id?: string) => {
  return apiHandler(dispatch, 'delete', '/v1/admin-pharmacy-certification', {
    params: { certification_id: id },
    successMessage: "Certification file deleted successfully!"
  });
};

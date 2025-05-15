import { axiosAdmin } from "@/lib/axiosAdmin";
import { setIsLoading, setProfileData, setLicenseData, setCertificationsData, setPharmacyStatsData, setExpenseGraphData, setPharmacyChecklists, setPharmacyAssignChecklists } from "@/store/features/global/globalSlice";
import { setPharmacyCourses } from "@/store/features/pharmacy/course/pharmacyCourseSlice";
import { setDocVerificationDetails, setUploadedBankStatements } from "@/store/features/pharmacy/document/DocumentVerificationSlice";
import { setexpenseData, setPharmacyExpenseStats } from "@/store/features/pharmacy/expense/pharmacyExpenseSlice";
import { setPharmacyMarketingMaterials } from "@/store/features/pharmacy/marketing/pharmacyMarketingSlice";
import { AppDispatch } from "@/store/store";
import toast from "react-hot-toast";

// Type definitions
type ApiMethod = 'get' | 'post' | 'put' | 'delete';

interface ApiResponse<T = any> {
  data?: T & { success?: boolean };
  status?: number;
  success?: boolean;
  message?: string;
}

interface ErrorResponse {
  message?: string;
  status?: number;
  response?: { data?: { detail?: string } };
}

interface FormDataPayload {
  [key: string]: string | Blob | any;
}

interface ExpenseData {
  expense_id?: string;
  [key: string]: any;
}

// Generic API handler
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
    refreshAction?: () => Promise<any>;
  } = {}
): Promise<T | null> => {
  const {
    data,
    params,
    successMessage,
    errorMessage = "Something went wrong",
    onSuccess,
    onError,
    isFormData = false,
    refreshAction
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

      if (refreshAction) {
        await refreshAction();
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

// ============= PROFILE SERVICES =============

export const fetchProfileDataPharmacy = async (dispatch: AppDispatch) => {
  return apiHandler(dispatch, 'get', '/v1/pharmacy-profile', {
    successMessage: "Profile fetched successfully!",
    onSuccess: (data) => dispatch(setProfileData(data))
  });
};

export const postProfileUpdatePharmacy = async (dispatch: AppDispatch, formData: FormDataPayload) => {
  return apiHandler(dispatch, 'post', '/v1/pharmacy-profile', {
    data: formData,
    isFormData: true,
    successMessage: "Profile updated successfully!",
    refreshAction: () => fetchProfileDataPharmacy(dispatch)
  });
};

// ============= LICENSE SERVICES =============

export const fetchPharmacyLicense = async (dispatch: AppDispatch) => {
  return apiHandler(dispatch, 'get', '/v1/pharmacy-license', {
    successMessage: "License fetched successfully!",
    onSuccess: (data) => dispatch(setLicenseData(data)),
    onError: () => dispatch(setLicenseData([]))
  });
};

export const postLicenseUploadFile = async (dispatch: AppDispatch, data: FormDataPayload) => {
  return apiHandler(dispatch, 'post', '/v1/pharmacy-license', {
    data,
    isFormData: true,
    successMessage: "License file uploaded successfully!"
  });
};

export const deletePharmacyLicense = async (dispatch: AppDispatch, id?: string) => {
  return apiHandler(dispatch, 'delete', '/v1/pharmacy-license', {
    params: { license_id: id },
    successMessage: "License file deleted successfully!",
    refreshAction: () => fetchPharmacyLicense(dispatch)
  });
};

// ============= CERTIFICATION SERVICES =============

export const fetchPharmacyCertifications = async (dispatch: AppDispatch) => {
  return apiHandler(dispatch, 'get', '/v1/pharmacy-certification', {
    successMessage: "Certificate fetched successfully!",
    onSuccess: (data) => dispatch(setCertificationsData(data)),
    onError: () => dispatch(setCertificationsData([]))
  });
};

export const postCertificationsUploadFile = async (dispatch: AppDispatch, data: FormDataPayload) => {
  return apiHandler(dispatch, 'post', '/v1/pharmacy-certification', {
    data,
    isFormData: true,
    successMessage: "Certification file uploaded successfully!"
  });
};

export const deletePharmacyCertification = async (dispatch: AppDispatch, id?: string) => {
  return apiHandler(dispatch, 'delete', '/v1/pharmacy-certification', {
    params: { certification_id: id },
    successMessage: "Certification file deleted successfully!",
    refreshAction: () => fetchPharmacyCertifications(dispatch)
  });
};

// ============= EXPENSE SERVICES =============

export const fetchPharmacyExpense = async (dispatch: AppDispatch) => {
  return apiHandler(dispatch, 'get', '/v1/pharmacy-expense', {
    successMessage: "Expense fetched successfully!",
    onSuccess: (data) => dispatch(setexpenseData(data)),
    onError: () => dispatch(setexpenseData([]))
  });
};

export const createNewPharmacyExpense = async (dispatch: AppDispatch, data: ExpenseData) => {
  return apiHandler(dispatch, 'post', '/v1/pharmacy-expense', {
    data,
    successMessage: "Expense created successfully!",
    refreshAction: () => fetchPharmacyExpense(dispatch)
  });
};

export const updatePharmacyExpense = async (dispatch: AppDispatch, data: ExpenseData) => {
  return apiHandler(dispatch, 'put', '/v1/pharmacy-expense', {
    params: { expense_id: data?.expense_id },
    data,
    successMessage: "Expense updated successfully!",
    refreshAction: () => fetchPharmacyExpense(dispatch)
  });
};

export const deletePharmacyExpense = async (dispatch: AppDispatch, id?: string) => {
  return apiHandler(dispatch, 'delete', '/v1/pharmacy-expense', {
    params: { expense_id: id },
    successMessage: "Expense deleted successfully!",
    refreshAction: () => fetchPharmacyExpense(dispatch)
  });
};

// ============= STATISTICS SERVICES =============

export const fetchPharmacyDashboardStats = async (dispatch: AppDispatch) => {
  return apiHandler(dispatch, 'get', '/v1/pharmacy-stats', {
    successMessage: "Stats fetched successfully!",
    onSuccess: (data) => dispatch(setPharmacyStatsData(data)),
    onError: () => dispatch(setPharmacyStatsData([]))
  });
};

export const fetchPharmacyExpenseStats = async (dispatch: AppDispatch) => {
  return apiHandler(dispatch, 'get', '/v1/pharmacy-expense-stats', {
    successMessage: "Stats fetched successfully!",
    onSuccess: (data) => dispatch(setPharmacyExpenseStats(data)),
    onError: () => dispatch(setPharmacyExpenseStats([]))
  });
};

export const fetchPharmacyExpenseGraph = async (dispatch: AppDispatch) => {
  return apiHandler(dispatch, 'get', '/v1/pharmacy-expense-graph', {
    successMessage: "Expense Graph fetched successfully!",
    onSuccess: (data) => dispatch(setExpenseGraphData(data)),
    onError: () => dispatch(setExpenseGraphData([]))
  });
};

// ============= COURSE SERVICES =============

export const fetchAllPharmacyCourses = async (dispatch: AppDispatch) => {
  return apiHandler(dispatch, 'get', '/v1/pharmacy-courses', {
    successMessage: "Courses fetched successfully!",
    onSuccess: (data) => dispatch(setPharmacyCourses(data)),
    onError: () => dispatch(setPharmacyCourses([]))
  });
};

// ============= MARKETING SERVICES =============

export const fetchAllPharmacyMarketingMaterials = async (dispatch: AppDispatch) => {
  return apiHandler(dispatch, 'get', '/v1/pharmacy-marketing', {
    successMessage: "Marketing Materials fetched successfully!",
    onSuccess: (data) => dispatch(setPharmacyMarketingMaterials(data)),
    onError: () => dispatch(setPharmacyMarketingMaterials([]))
  });
};

// ============= PAYMENT RECONCILIATION SERVICES =============

export const createNewPaymentReconciliation = async (dispatch: AppDispatch, data: FormDataPayload, statement_id?: string) => {
  return apiHandler(dispatch, 'post', '/v1/payment-reconciliation', {
    params: { statement_id },
    data,
    isFormData: true,
    successMessage: "Payment Reconciliation uploaded successfully!",
    refreshAction: () => fetchPaymentReconciliation(dispatch)
  });
};

export const fetchPaymentReconciliation = async (dispatch: AppDispatch) => {
  return apiHandler(dispatch, 'get', '/v1/payment-reconciliation', {
    successMessage: "Payment Reconciliation History fetched successfully!",
    onSuccess: (data) => dispatch(setDocVerificationDetails(data)),
    onError: () => dispatch(setDocVerificationDetails([]))
  });
};

// ============= BANK STATEMENT SERVICES =============

export const fetchBankStatements = async (dispatch: AppDispatch) => {
  return apiHandler(dispatch, 'get', '/v1/bank-statement', {
    successMessage: "Bank Statements fetched successfully!",
    onSuccess: (data) => dispatch(setUploadedBankStatements(data)),
    onError: () => dispatch(setUploadedBankStatements([]))
  });
};

export const postBankStatement = async (dispatch: AppDispatch, data: FormDataPayload) => {
  return apiHandler(dispatch, 'post', '/v1/upload-statement', {
    data,
    isFormData: true,
    refreshAction: () => fetchBankStatements(dispatch)
  });
};

export const deleteBankStatement = async (dispatch: AppDispatch, id: string) => {
  return apiHandler(dispatch, 'delete', '/v1/bank-statement', {
    params: { statement_id: id },
    refreshAction: () => fetchBankStatements(dispatch)
  });
};


export const fetchPharmacyChecklist = async (dispatch: AppDispatch, type: string) => {
  return apiHandler(dispatch, 'get', '/v1/pharmacy/checklists', {
    params: { checklist_type: type },
    successMessage: type === 'operations' ? "Operations Checklist fetched successfully!" : "Onboarding Checklist fetched successfully!",
    onSuccess: (data) => dispatch(setPharmacyChecklists(data)),
  });
};

export const fetchPharmacyAssignChecklist = async (dispatch: AppDispatch, id: string, type: string) => {
  return apiHandler(dispatch, 'get', '/v1/pharmacy/assigned-checklist', {
    params: { checklist_id: id, checklist_type: type },
    successMessage: type === 'operations' ? "Operations assigned checklist fetched successfully!" : "Onboarding assigned checklist fetched successfully!",
    onSuccess: (data) => dispatch(setPharmacyAssignChecklists(data)),
  });
};

export const updatePharmacyAssignChecklist = async (dispatch: AppDispatch, data: any, type: string) => {
  return apiHandler(dispatch, 'put', '/v1/pharmacy/assigned-checklist', {
    params: { assigned_id: data?.assigned_id },
    data,
    successMessage: type === 'operations' ? "Operations assigned checklist updated successfully!" : "Onboarding assigned checklist updated successfully!",
    onSuccess: () => fetchPharmacyAssignChecklist(dispatch, data?.checklist_id, type)
  });
};
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import globalReducer from "./features/global/globalSlice"

// Admin Imports
import adminDashboardReducer from "./features/admin/dashboard/adminDashboardSlice";
import adminCourseReducer from "./features/admin/course/adminCourseSlice";
import adminChecklistReducer from "./features/admin/checklist/adminChecklistSlice"
import adminMarketingReducer from "./features/admin/marketing/adminMarketingSlice"
import adminCategoryReducer from "./features/admin/category/adminCategorySlice"
import adminExpenseReducer from "./features/admin/expense/adminExpenseSlice";
import adminPharmacyReducer from "./features/admin/pharmacy/adminPharmacySlice";

// Pharmacy Imports
import pharmacyExpenseReducer from "./features/pharmacy/expense/pharmacyExpenseSlice";
import operationsExpenseReducer from "./features/pharmacy/operations/operationsExpenseSlice"
import pharmacyOnboardingExpenseReducer from "./features/pharmacy/onboarding/pharmacyOnboardingExpenseSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    global: globalReducer,

    // Admin Reducers
    adminDashboard: adminDashboardReducer,
    course: adminCourseReducer,
    checklist: adminChecklistReducer,
    marketing: adminMarketingReducer,
    category: adminCategoryReducer,
    expense: adminExpenseReducer,
    pharmacy: adminPharmacyReducer,

    // Pharmacy Reducers
    pharmacyExpense: pharmacyExpenseReducer,
    operations: operationsExpenseReducer,
    onboarding: pharmacyOnboardingExpenseReducer,

});

export default rootReducer;

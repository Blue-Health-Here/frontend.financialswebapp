import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import courseReducer from "./features/admin/course/adminCourseSlice";
import checklistReducer from "./features/admin/checklist/adminChecklistSlice"
import marketingReducer from "./features/admin/marketing/adminMarketingSlice"
import categoryReducer from "./features/admin/category/adminCategorySlice"
import expenseReducer from "./features/admin/expense/adminExpenseSlice";
import globalReducer from "./features/global/globalSlice"
import pharmacyReducer from "./features/admin/pharmacy/adminPharmacySlice";

const rootReducer = combineReducers({
    auth: authReducer,
    course: courseReducer,
    checklist: checklistReducer,
    marketing: marketingReducer,
    category: categoryReducer,
    expense: expenseReducer,
    global: globalReducer,
    pharmacy: pharmacyReducer,
});

export default rootReducer
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import courseReducer from "./features/course/courseSlice";
import checklistReducer from "./features/checklist/checklistSlice"
import marketingReducer from "./features/marketing/marketingSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    course: courseReducer,
    checklist: checklistReducer,
    marketing: marketingReducer
});

export default rootReducer
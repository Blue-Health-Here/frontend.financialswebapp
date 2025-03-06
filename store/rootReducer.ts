import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import courseReducer from "./features/course/courseSlice";
import marketingReducer from "./features/marketing/marketingSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    course: courseReducer,
    marketing: marketingReducer
});

export default rootReducer
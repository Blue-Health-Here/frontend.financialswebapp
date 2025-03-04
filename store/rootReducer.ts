import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import courseReducer from "./features/course/courseSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    course: courseReducer
});

export default rootReducer
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAddCourse: false,
    courses: []
};

const adminCourseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        setIsAddCourse: (state, action) => {
            state.isAddCourse = action.payload;
        },
        setCourses: (state, action) => {
            state.courses = action.payload;
        }
    }
});

export const { setIsAddCourse, setCourses } = adminCourseSlice.actions;

export default adminCourseSlice.reducer;
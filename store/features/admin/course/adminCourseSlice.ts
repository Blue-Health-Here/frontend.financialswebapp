import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAddCourse: false,
    courses: [],
    courseDetails: null
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
        },
        setCourseDetails: (state, action) => {
            state.courseDetails = action.payload;
        }
    }
});

export const { setIsAddCourse, setCourses, setCourseDetails } = adminCourseSlice.actions;

export default adminCourseSlice.reducer;
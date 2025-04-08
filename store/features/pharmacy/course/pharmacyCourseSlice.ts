import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courses: [],
};

const pharmacyCourseSlice = createSlice({
    name: 'pharmacyCourse',
    initialState,
    reducers: {
        setPharmacyCourses: (state, action) => {
            state.courses = action.payload;
        }
    }
});

export const { setPharmacyCourses } = pharmacyCourseSlice.actions;

export default pharmacyCourseSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAddCourse: false
};

const courseSlice = createSlice({
  name: 'course',
    initialState, 
    reducers: {
        setIsAddCourse: (state, action) => {
            state.isAddCourse = action.payload;
        }
    }
});

export const { setIsAddCourse } = courseSlice.actions;

export default courseSlice.reducer;
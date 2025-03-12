import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAddCategory: false
};

const adminCategorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setIsAddCategory: (state, action) => {
            state.isAddCategory = action.payload;
        }
    }
});

export const { setIsAddCategory } = adminCategorySlice.actions;

export default adminCategorySlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAddCategory: false,
    categories:[],
    categoryDetails: null
};

const adminCategorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setSelectCategories: (state, action) => {
            state.categories = action.payload;
        },
        setCategoryDetails: (state, action) => {
            state.categoryDetails = action.payload;
        },
        setIsAddCategory: (state, action) => {
            state.isAddCategory = action.payload;
        }
    }
});

export const { setIsAddCategory, setSelectCategories, setCategoryDetails } = adminCategorySlice.actions;

export default adminCategorySlice.reducer;
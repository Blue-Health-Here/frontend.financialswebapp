import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAddCategory: false,
    categories:[],
};

const adminCategorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setSelectCategories: (state, action) => {
            state.categories = action.payload;
        },
        setIsAddCategory: (state, action) => {
            state.isAddCategory = action.payload;
        }
    }
});

export const { setIsAddCategory, setSelectCategories } = adminCategorySlice.actions;

export default adminCategorySlice.reducer;
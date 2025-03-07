import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAddCategory: false
};

const categorySlice = createSlice({
  name: 'category',
    initialState, 
    reducers: {
        setIsAddCategory: (state, action) => {
            state.isAddCategory = action.payload;
        }
    }
});

export const { setIsAddCategory } = categorySlice.actions;

export default categorySlice.reducer;
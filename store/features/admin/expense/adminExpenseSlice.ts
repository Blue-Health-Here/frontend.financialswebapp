import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAddExpense: false
};

const adminExpenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        setIsAddExpense: (state, action) => {
            state.isAddExpense = action.payload;
        }
    }
});

export const { setIsAddExpense } = adminExpenseSlice.actions;

export default adminExpenseSlice.reducer;
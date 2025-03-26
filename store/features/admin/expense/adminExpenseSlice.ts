import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAddExpense: false,
    expenseData:[]
};

const adminExpenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        setIsAddExpense: (state, action) => {
            state.isAddExpense = action.payload;
        },
        setExpenseData: (state, action) => {
            state.expenseData = action.payload
        },
    }
});

export const { setIsAddExpense, setExpenseData } = adminExpenseSlice.actions;

export default adminExpenseSlice.reducer;
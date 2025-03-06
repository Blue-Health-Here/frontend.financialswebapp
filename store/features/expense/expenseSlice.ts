import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAddExpense: false
};

const expenseSlice = createSlice({
  name: 'expense',
    initialState, 
    reducers: {
        setIsAddExpense: (state, action) => {
            state.isAddExpense = action.payload;
        }
    }
});

export const { setIsAddExpense } = expenseSlice.actions;

export default expenseSlice.reducer;
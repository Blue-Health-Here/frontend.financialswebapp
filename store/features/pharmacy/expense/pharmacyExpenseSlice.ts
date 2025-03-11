import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAddExpense: false
};

const pharmacyExpenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        setIsAddExpense: (state, action) => {
            state.isAddExpense = action.payload;
        }
    }
});

export const { setIsAddExpense } = pharmacyExpenseSlice.actions;

export default pharmacyExpenseSlice.reducer;
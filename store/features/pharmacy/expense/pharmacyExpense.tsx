import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAddExpense: false
};

const pharmacyExpense = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        setIsAddExpense: (state, action) => {
            state.isAddExpense = action.payload;
        }
    }
});

export const { setIsAddExpense } = pharmacyExpense.actions;

export default pharmacyExpense.reducer;
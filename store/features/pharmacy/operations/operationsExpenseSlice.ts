import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAddOperationsExpense: false
};

const operationsExpenseSlicel = createSlice({
    name: 'operations',
    initialState,
    reducers: {
        setIsAddOperationsExpense: (state, action) => {
            state.isAddOperationsExpense = action.payload;
        }
    }
});

export const { setIsAddOperationsExpense } = operationsExpenseSlicel.actions;

export default operationsExpenseSlicel.reducer;
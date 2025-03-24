import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAddExpense: false,
    expenseStats: null,
    loading: false
};

const pharmacyExpenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        setIsAddExpense: (state, action) => {
            state.isAddExpense = action.payload;
        },
        setExpenseStats: (state, action) => {
            state.expenseStats = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const { setIsAddExpense, setExpenseStats, setLoading } = pharmacyExpenseSlice.actions;

export default pharmacyExpenseSlice.reducer;
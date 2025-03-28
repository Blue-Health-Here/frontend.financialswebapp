import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAddExpense: false,
    expenseData: null,
    loading: false,
    expenseDetails: null,
    pharmacyExpenseStats: []
};

const pharmacyExpenseSlice = createSlice({
    name: 'pharmacyExpense',
    initialState,
    reducers: {
        setIsAddExpense: (state, action) => {
            state.isAddExpense = action.payload;
        },
        setexpenseData: (state, action) => {
            state.expenseData = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setExpenseDetails:(state, action) => {
            state.expenseDetails = action.payload;
        },
        setPharmacyExpenseStats: (state, action) => {
            state.pharmacyExpenseStats = action.payload
        },
    }
});

export const { setIsAddExpense, setexpenseData, setLoading, setExpenseDetails, setPharmacyExpenseStats } = pharmacyExpenseSlice.actions;

export default pharmacyExpenseSlice.reducer;
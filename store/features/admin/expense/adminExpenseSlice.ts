import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAddExpense: false,
    expenseData: [],
    pharmacyList: [],
    expenseDetail: null,
    adminExpenseStats:[]
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
        setPharmacyList: (state, action) => {
            state.pharmacyList = action.payload
        },
        setExpenseDetail: (state, action) => {
            state.expenseDetail = action.payload
        },
        setAdminExpenseStats: (state, action) => {
            state.expenseDetail = action.payload
        },
    }
});

export const { setIsAddExpense, setExpenseData, setPharmacyList, setExpenseDetail } = adminExpenseSlice.actions;

export default adminExpenseSlice.reducer;
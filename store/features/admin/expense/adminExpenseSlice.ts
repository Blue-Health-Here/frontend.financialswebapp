import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAddExpense: false,
    adminExpenseData: [],
    pharmacyList: [],
    adminExpenseDetail: null
};

const adminExpenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        setIsAddExpense: (state, action) => {
            state.isAddExpense = action.payload;
        },
        setAdminExpenseData: (state, action) => {
            state.adminExpenseData = action.payload
        },
        setPharmacyList: (state, action) => {
            state.pharmacyList = action.payload
        },
        setAdminExpenseDetail: (state, action) => {
            state.adminExpenseDetail = action.payload
        },
    }
});

export const { setIsAddExpense, setAdminExpenseData, setPharmacyList, setAdminExpenseDetail } = adminExpenseSlice.actions;

export default adminExpenseSlice.reducer;
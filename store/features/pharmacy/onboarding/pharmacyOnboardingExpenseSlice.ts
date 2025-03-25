import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAddExpenseModal: false
};

const pharmacyOnboardingExpenseSlice = createSlice({
    name: 'onboarding',
    initialState,
    reducers: {
        setIsAddExpenseModal: (state, action) => {
            state.isAddExpenseModal = action.payload;
        }
    }
});

export const { setIsAddExpenseModal } = pharmacyOnboardingExpenseSlice.actions;

export default pharmacyOnboardingExpenseSlice.reducer;
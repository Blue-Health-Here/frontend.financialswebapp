import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    marketingMaterials: [],
};

const pharmacyMarketingSlice = createSlice({
    name: 'pharmacyMarketing',
    initialState,
    reducers: {
        setPharmacyMarketingMaterials: (state, action) => {
            state.marketingMaterials = action.payload;
        }
    }
});

export const { setPharmacyMarketingMaterials } = pharmacyMarketingSlice.actions;

export default pharmacyMarketingSlice.reducer;
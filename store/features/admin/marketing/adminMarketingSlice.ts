import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAddMarketing: false,
    marketingMaterials: []
};

const adminMarketingSlice = createSlice({
    name: 'marketing',
    initialState,
    reducers: {
        setMarketingMaterials: (state, action) => {
            state.marketingMaterials = action.payload;
        },
        setIsAddMarketing: (state, action) => {
            state.isAddMarketing = action.payload;
        }
    }
});

export const { setIsAddMarketing, setMarketingMaterials } = adminMarketingSlice.actions;
export default adminMarketingSlice.reducer;
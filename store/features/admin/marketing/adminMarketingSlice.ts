import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAddMarketing: false,
    marketingMaterials: [],
    marketingMaterialsDetails: null
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
        },
        setMarketingMaterialsDetails:(state, action) =>{
            state.marketingMaterialsDetails = action.payload
        }
    }
});

export const { setIsAddMarketing, setMarketingMaterials,setMarketingMaterialsDetails } = adminMarketingSlice.actions;

export default adminMarketingSlice.reducer;
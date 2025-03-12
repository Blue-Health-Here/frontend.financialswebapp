import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAddMarketing: false
}

const adminMarketingSlice = createSlice({
    name: 'marketing',
    initialState,
    reducers: {
        setIsAddMarketing: (state, action) => {
            state.isAddMarketing = action.payload
        }
    }
})

export const { setIsAddMarketing } = adminMarketingSlice.actions
export default adminMarketingSlice.reducer
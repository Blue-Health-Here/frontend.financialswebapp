import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAddMarketing: false
}

const marketingSlice = createSlice({
    name: 'marketing',
    initialState,
    reducers: {
        setIsAddMarketing: (state, action) => {
            state.isAddMarketing = action.payload
        }
    }
})

export const { setIsAddMarketing } = marketingSlice.actions
export default marketingSlice.reducer
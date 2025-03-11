import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAddQuestion: false
}

const adminPharmacySlice = createSlice({
    name: 'pharmacy',
    initialState,
    reducers: {
        setIsAddQuestion: (state, action) => {
            state.isAddQuestion = action.payload
        }
    }
})

export const { setIsAddQuestion } = adminPharmacySlice.actions
export default adminPharmacySlice.reducer
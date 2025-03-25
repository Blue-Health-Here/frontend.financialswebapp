import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAddQuestion: false,
    pharmacies: []
}

const adminPharmacySlice = createSlice({
    name: 'pharmacy',
    initialState,
    reducers: {
        setPharmacies: (state, action) => {
            state.pharmacies = action.payload;
        },
        setIsAddQuestion: (state, action) => {
            state.isAddQuestion = action.payload
        }
    }
})

export const { setPharmacies, setIsAddQuestion } = adminPharmacySlice.actions
export default adminPharmacySlice.reducer
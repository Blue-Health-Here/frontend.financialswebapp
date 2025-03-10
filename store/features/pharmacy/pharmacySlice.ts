import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAddQuestion: false
}

const pharmacySlice = createSlice({
    name: 'pharmacy',
    initialState,
    reducers: {
        setIsAddQuestion: (state, action) => {
            state.isAddQuestion = action.payload
        }
    }
})

export const { setIsAddQuestion } = pharmacySlice.actions
export default pharmacySlice.reducer
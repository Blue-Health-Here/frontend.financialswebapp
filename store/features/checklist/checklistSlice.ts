import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAddQuestion: false
}

const checklistSlice = createSlice({
    name: "checklist",
    initialState,
    reducers: {
        setIsAddQuestion: (state, action) => {
            state.isAddQuestion = action.payload
        }
    }
})

export const { setIsAddQuestion } = checklistSlice.actions

export default checklistSlice.reducer
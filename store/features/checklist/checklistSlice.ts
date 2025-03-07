import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAddQuestion: false,
    isEditQuestion: false
}

const checklistSlice = createSlice({
    name: "checklist",
    initialState,
    reducers: {
        setIsAddQuestion: (state, action) => {
            state.isAddQuestion = action.payload
        },
        setIsEditQuestion: (state, action) => {
            state.isEditQuestion = action.payload
        }
    }
})

export const { setIsAddQuestion, setIsEditQuestion } = checklistSlice.actions

export default checklistSlice.reducer
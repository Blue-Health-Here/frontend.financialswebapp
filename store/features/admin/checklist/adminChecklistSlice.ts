import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAddQuestion: false,
    isEditQuestion: false,
    isAddChecklist: false,
}

const adminChecklistSlice = createSlice({
    name: "checklist",
    initialState,
    reducers: {
        setIsAddQuestion: (state, action) => {
            state.isAddQuestion = action.payload
        },
        setIsEditQuestion: (state, action) => {
            state.isEditQuestion = action.payload
        },
        setIsAddChecklist: (state, action) => {
            state.isAddChecklist = action.payload
        },
    }
})

export const { setIsAddQuestion, setIsEditQuestion,setIsAddChecklist } = adminChecklistSlice.actions

export default adminChecklistSlice.reducer
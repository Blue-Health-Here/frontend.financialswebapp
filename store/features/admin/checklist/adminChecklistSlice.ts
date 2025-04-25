import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAddQuestion: false,
    isEditQuestion: false,
    isAddChecklist: false,
    checklists: [],
    checklistDetail: null
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
        setChecklists: (state, action) => {
            state.checklists = action.payload
        },
        setChecklistDetail: (state, action) => {
            state.checklistDetail = action.payload
        },
    }
})

export const { setIsAddQuestion, setIsEditQuestion,setIsAddChecklist, setChecklists, setChecklistDetail } = adminChecklistSlice.actions

export default adminChecklistSlice.reducer
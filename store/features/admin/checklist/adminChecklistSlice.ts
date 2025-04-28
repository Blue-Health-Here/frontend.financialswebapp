import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAddQuestion: false,
    isEditQuestion: false,
    isAddChecklist: false,
    checklists: [],
    checklistDetail: null,
    tasklist: []
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
        setTasklist: (state, action) => {
            state.tasklist = action.payload
        },
    }
})

export const { setIsAddQuestion, setIsEditQuestion,setIsAddChecklist, setChecklists, setChecklistDetail, setTasklist } = adminChecklistSlice.actions

export default adminChecklistSlice.reducer
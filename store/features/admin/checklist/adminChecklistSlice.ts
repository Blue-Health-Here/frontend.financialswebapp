import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAddQuestion: false,
    isEditQuestion: false,
    isAddChecklist: false,
    checklists: [],
    checklistDetail: null,
    onboarding: [],
    operations: [],
    operationalItems: []
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
        setOnboardingdTasklist: (state, action) => {
            state.onboarding = action.payload
        },
        setOperationsTasklist: (state, action) => {
            state.operations = action.payload
        },
        setOperationalItems: (state, action) => {
            state.operationalItems = action.payload
        },
    }
})

export const { setIsAddQuestion, setIsEditQuestion,setIsAddChecklist, setChecklists, setChecklistDetail, setOnboardingdTasklist, setOperationalItems, setOperationsTasklist } = adminChecklistSlice.actions

export default adminChecklistSlice.reducer
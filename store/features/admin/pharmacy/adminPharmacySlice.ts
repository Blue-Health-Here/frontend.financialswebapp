import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pharmacies: [],
    pharmacyCourses: [],
    onboardingChecklist: [],
    operationsChecklist: [],
    selectedChecklistItem: null,

}

const adminPharmacySlice = createSlice({
    name: 'pharmacy',
    initialState,
    reducers: {
        setPharmacies: (state, action) => {
            state.pharmacies = action.payload;
        },
        setAdminPharmacyCoursesData(state, action) {
            state.pharmacyCourses = action.payload;
        },
        setOnboardingChecklist(state, action) {
            state.onboardingChecklist = action.payload;
        },
        setOperationsChecklist(state, action) {
            state.operationsChecklist = action.payload;
        },
        setSelectedChecklistItem: (state, action) => {
            state.selectedChecklistItem = action.payload;
          },          
    }
})

export const { setPharmacies, setAdminPharmacyCoursesData, setOnboardingChecklist, setOperationsChecklist, setSelectedChecklistItem } = adminPharmacySlice.actions
export default adminPharmacySlice.reducer
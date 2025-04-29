import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAddQuestion: false,
    pharmacies: [],
    pharmacyCourses: []
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
        },
        setAdminPharmacyCoursesData(state, action) {
            state.pharmacyCourses = action.payload;
        }
    }
})

export const { setPharmacies, setIsAddQuestion, setAdminPharmacyCoursesData } = adminPharmacySlice.actions
export default adminPharmacySlice.reducer
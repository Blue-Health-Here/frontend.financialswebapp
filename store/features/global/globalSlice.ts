import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSidebarOpen: false,
    isLoading: false,
    profileData: null,
    pharmacyDetailsData: null,
    licenseData: [],
    certificationsData: [],
    expenseCategories: []
};

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setIsSidebarOpen: (state, action) => {
            state.isSidebarOpen = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setProfileData: (state, action) => {
            state.profileData = action.payload;
        },
        setLicenseData: (state, action) => {
            state.licenseData = action.payload;
        },
        setCertificationsData: (state, action) => {
            state.certificationsData = action.payload;
        },
        setPharmacyDetailsData: (state, action) => {
            state.pharmacyDetailsData = action.payload;
        },
        setExpenseCategories: (state, action) => {
            state.expenseCategories = action.payload;
        }
    }
});

export const { setIsSidebarOpen, setIsLoading, setProfileData, setLicenseData, setCertificationsData, setExpenseCategories, setPharmacyDetailsData } = globalSlice.actions;

export default globalSlice.reducer;

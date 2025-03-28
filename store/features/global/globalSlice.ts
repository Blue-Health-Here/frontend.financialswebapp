import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSidebarOpen: false,
    isLoading: false,
    profileData: null,
    licenseData: [],
    certificationsData: [],
    expenseCategories:[],
    expenseGraphData: null

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
      setExpenseCategories: (state, action) => {
        state.expenseCategories = action.payload;
    },
    setExpenseGraphData: (state, action) => {
        state.expenseGraphData = action.payload;
    }
    }
});

export const { setIsSidebarOpen, setIsLoading, setProfileData,setLicenseData, setCertificationsData, setExpenseCategories,setExpenseGraphData} = globalSlice.actions;

export default globalSlice.reducer;

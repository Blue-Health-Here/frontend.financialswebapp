import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSidebarOpen: false,
    isLoading: false,
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
        }
    }
});

export const { setIsSidebarOpen, setIsLoading } = globalSlice.actions;

export default globalSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    stats: null
};

const adminDashboardSlice = createSlice({
    name: 'adminDashboard',
    initialState,
    reducers: {
        setStats: (state, action) => {
            state.stats = action.payload;
        }
    }
});

export const { setStats } = adminDashboardSlice.actions;

export default adminDashboardSlice.reducer;
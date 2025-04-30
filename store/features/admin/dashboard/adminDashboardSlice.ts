import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    stats: null,
    adminExpenseGraphData: []
};

const adminDashboardSlice = createSlice({
    name: 'adminDashboard',
    initialState,
    reducers: {
        setStats: (state, action) => {
            state.stats = action.payload;
        },
        setAdminExpenseGraphData: (state, action) => {
            state.adminExpenseGraphData = action.payload;
        }
    }
});

export const { setStats, setAdminExpenseGraphData } = adminDashboardSlice.actions;

export default adminDashboardSlice.reducer;
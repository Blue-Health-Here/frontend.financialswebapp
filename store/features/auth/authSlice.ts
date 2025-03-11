import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null
};

const authSlice = createSlice({
  name: 'auth',
    initialState, 
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.access_token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        }
    }
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
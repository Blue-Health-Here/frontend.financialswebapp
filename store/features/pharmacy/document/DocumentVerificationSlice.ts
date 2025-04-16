import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    docVerificationDetails: []
};

const DocumentVerificationSlice = createSlice({
    name: 'DocumentVerification',
    initialState,
    reducers: {
      setDocVerificationDetails: (state, action) => {
          state.docVerificationDetails = action.payload;
      }
    }
});

export const { setDocVerificationDetails } = DocumentVerificationSlice.actions;

export default DocumentVerificationSlice.reducer;
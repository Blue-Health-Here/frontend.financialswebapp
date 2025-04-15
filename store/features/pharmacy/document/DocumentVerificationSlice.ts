import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    DocumentVerificationDetails: []
};

const DocumentVerificationSlice = createSlice({
    name: 'DocumentVerification',
    initialState,
    reducers: {
      setDocumentVerificationDetails: (state, action) => {
          state.DocumentVerificationDetails = action.payload;
      }
    }
});

export const { setDocumentVerificationDetails } = DocumentVerificationSlice.actions;

export default DocumentVerificationSlice.reducer;
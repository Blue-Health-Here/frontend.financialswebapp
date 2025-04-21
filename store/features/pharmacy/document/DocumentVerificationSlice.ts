import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    docVerificationDetails: [],
    bankStatements: []
};

const DocumentVerificationSlice = createSlice({
    name: 'DocumentVerification',
    initialState,
    reducers: {
        setDocVerificationDetails: (state, action) => {
            state.docVerificationDetails = action.payload;
        },
        setUploadedBankStatements: (state, action) => {
            state.bankStatements = action.payload;
        }
    }
});

export const { setDocVerificationDetails, setUploadedBankStatements } = DocumentVerificationSlice.actions;

export default DocumentVerificationSlice.reducer;
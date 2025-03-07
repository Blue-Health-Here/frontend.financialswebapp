import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isShowPharmacy: false
}

const pharmacySlice = createSlice({
    name: 'pharmacy',
    initialState,
    reducers: {
        setIsShowPharmacy: (state, action) => {
            state.isShowPharmacy = action.payload
        }
    }
})

export const { setIsShowPharmacy } = pharmacySlice.actions
export default pharmacySlice.reducer
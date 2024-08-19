import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
    name: 'toast',
    initialState: {
        message: null,
        type: null,
        isVisible: false,
    },
    reducers: {
        showToast: (state, action) => {
            state.message = action.payload.message;
            state.type = action.payload.type;
            state.isVisible = true;
        },
        hideToast: (state) => {
            state.isVisible = false;
        }
    }
})

export const {showToast, hideToast} = toastSlice.actions;
export default toastSlice.reducer;
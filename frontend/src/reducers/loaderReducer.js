import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
    name: 'loading',
    initialState: {
        isLoading: false
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload.isLoading;
        },
    }
})

export const {setLoading} = toastSlice.actions;
export default toastSlice.reducer;
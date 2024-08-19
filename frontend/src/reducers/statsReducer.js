import { createSlice } from "@reduxjs/toolkit";

const statsSlice = createSlice({
    name: 'stats',
    initialState: null,
    reducers: {
        setStats(state, action){
            return action.payload;
        },
        clearStats(state, action){
            return null;
        }
    }
});

export const {setStats, clearStats} = statsSlice.actions;
export default statsSlice.reducer;
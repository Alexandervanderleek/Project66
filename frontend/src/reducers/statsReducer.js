import { createSlice } from "@reduxjs/toolkit";

const statsSlice = createSlice({
    name: 'stats',
    initialState: null,
    reducers: {
        setStats(state, action){
            return action.payload;
        },
    }

});

export const {setStats} = statsSlice.actions

export default statsSlice.reducer
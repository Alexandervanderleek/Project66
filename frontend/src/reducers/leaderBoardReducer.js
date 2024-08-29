import { createSlice } from "@reduxjs/toolkit";

const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState: {
        leaderboard: null,
        position: null
    },
    reducers: {
        setLeaderboard: (state, action) => {
            state = action.payload;
            return state;
        },
    }
})

export const {setLeaderboard} = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
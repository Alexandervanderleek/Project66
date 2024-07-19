import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        createUser(state, action) {
            const user = action.payload

            console.log(user)

            return user;
        }
    }
});


export const { createUser } = userSlice.actions;
export default userSlice.reducer;
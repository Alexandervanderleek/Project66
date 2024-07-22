import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        createUser(state, action) {
            const user = action.payload.user

            return user;
        },
        destroyUser(state, action){
            return null;
        }
    }
});


export const { createUser, destroyUser } = userSlice.actions;
export default userSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const habbitSlice = createSlice({
    name: 'habbits',
    initialState: null,
    reducers: {
        setHabbits(state, action){
            return action.payload;
        },
        addHabbit(state, action){
            state.push(action.payload)
        },
        clearHabbits(state, action){
            return []
        },
        deleteHabbit(state, action){

            const id = action.payload

            

            const newState = state.filter((habbit)=> habbit.id !== id);

            return newState;
        }
    }

});

export const {setHabbits, addHabbit, clearHabbits, deleteHabbit} = habbitSlice.actions

export default habbitSlice.reducer
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
        },
        updatedHabbit(state, action){
            const newHabbit = action.payload;

            const habbitsToStay = state.map((habbit)=> habbit.id != newHabbit.id ? habbit : newHabbit );

            return habbitsToStay
        }
    }

});

export const {setHabbits, addHabbit, clearHabbits, deleteHabbit, updatedHabbit} = habbitSlice.actions

export default habbitSlice.reducer
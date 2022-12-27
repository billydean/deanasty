import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './index';
import firstPerson from '../utils/firstPerson';
import type { People } from '../types';


let initialState: People = []

export const peopleSlice = createSlice({
    name: 'people',
    initialState,
    reducers: {
        beLife: (state) => {
            return [...state, firstPerson()];
        },
        begone: () => {
            return []
        },
    }
});

export const { beLife, begone} = peopleSlice.actions;

export const selectPeople = (state: RootState) => state.people;

export default peopleSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

interface Check {
    check: boolean
}

const initialState: Check = {
    check: false
}

export const checkSlice = createSlice({
    name: 'check',
    initialState,
    reducers: {
        startSim: (state) => {
            state.check = true;
        },
        restartSim: (state) => {
            state.check = false;
        }
    }
});

export const { startSim, restartSim } = checkSlice.actions;

export const selectPeopleCheck = (state: RootState) => state.check.check;

export default checkSlice.reducer;
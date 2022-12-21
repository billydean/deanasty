import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';
import type { Year, War, Plague, Person, People } from '../types';

const initialState: Year = {
    current: 0,
    total: 0,
    global_stability: 5,
    region_stability: 5,
    local_stability: 5,
    plague_now: false,
    climate: 'good',
    crops: 'good',
    crop_fortune: 5,
    war_now: false,
};

export const yearSlice = createSlice({
    name: 'year',
    initialState,
    reducers: {
        increment: (state) => {
            state.current += 1;
            state.total += 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.current += action.payload;
        }
    }
});

export const { increment, incrementByAmount } = yearSlice.actions;

export const selectCurrentYear = (state: RootState) => state.year.current;

export default yearSlice.reducer;
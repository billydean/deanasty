import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';
import type { Year } from '../types';

const initialState: Year = {
    current: 1,
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
        incrementYear: (state) => {
            state.current += 1;
            state.total += 1;
        },
        restartYear: (state) => {
            state.current = 0;
            state.global_stability = 5;
            state.region_stability = 5;
            state.local_stability = 5;
            state.plague_now = false;
            state.climate = 'good';
            state.crops = 'good';
            state.crop_fortune = 5;
            state.war_now = false;
        }
        }
    }
);

export const { incrementYear, restartYear } = yearSlice.actions;

export const selectCurrentYear = (state: RootState) => state.year.current;

export default yearSlice.reducer;
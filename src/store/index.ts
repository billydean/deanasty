import { configureStore } from '@reduxjs/toolkit';
import yearReducer from './yearSlice';

export const store = configureStore({
    reducer: {
        year: yearReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
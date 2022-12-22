import { configureStore } from '@reduxjs/toolkit';
import yearReducer from './yearSlice';
import checkReducer from './checkSlice';

export const store = configureStore({
    reducer: {
        year: yearReducer,
        check: checkReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
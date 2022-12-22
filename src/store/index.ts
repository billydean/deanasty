import { configureStore } from '@reduxjs/toolkit';
import yearReducer from './yearSlice';
import checkReducer from './checkSlice';
import peopleReducer from './peopleSlice';

export const store = configureStore({
    reducer: {
        year: yearReducer,
        check: checkReducer,
        people: peopleReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
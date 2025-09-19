import { configureStore } from '@reduxjs/toolkit';
import { timezoneApi } from './api/timezoneApi';
import workScheduleReducer from './slices/workScheduleSlice';

export const store = configureStore({
  reducer: {
    workSchedule: workScheduleReducer,
    [timezoneApi.reducerPath]: timezoneApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(timezoneApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
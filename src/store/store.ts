import { waterSlice } from './../features/water/dataWaterSlice';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import dashboardReducer from '../features/dashboard/DashboardSlice';
import dialogReducer from '../features/dialog/dialogSlice';
import waterReducer from '../features/water/dataWaterSlice';
import astablishReducer from 'src/features/astablish/astablishSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dialog: dialogReducer,
    dashboard: dashboardReducer,
    water: waterReducer,
    astablish: astablishReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import dashboardReducer from '../features/dashboard/DashboardSlice';
import dialogReducer from '../features/dialog/dialogSlice';
import establishSlice from 'src/features/establish/establishSlice';
import chargeSlice from 'src/features/charge/chargeSlice';
import listAriseReducer from '../pages/admin/arise/ListArise/reducer';
import updateAriseReducer from '../pages/admin/arise/UpdateArise/reducer';
import houseReducer from 'src/features/room/houseSlice'
import roomReducer from 'src/features/room/roomSlice'
import depositReducer from 'src/features/deposit/deposit';
import waterReducer from 'src/features/water/waterSlice';
import electricitySlice from 'src/features/electricity/electricitySlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    dialog: dialogReducer,
    dashboard: dashboardReducer,
    house: houseReducer,
    room: roomReducer,
    establish: establishSlice,
    charge: chargeSlice,
    listArise: listAriseReducer,
    updateArise: updateAriseReducer,
    deposit: depositReducer,
    water: waterReducer,
    electricity: electricitySlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

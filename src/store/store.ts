import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import dashboardReducer from '../features/dashboard/DashboardSlice';
import dialogReducer from '../features/dialog/dialogSlice';
import listServiceReducer from '../pages/admin/service/ListService/reducer';
import establishSlice from 'src/features/establish/establishSlice';
import chargeSlice from 'src/features/charge/chargeSlice';
import listAriseReducer from '../pages/admin/arise/ListArise/reducer';
import updateAriseReducer from '../pages/admin/arise/UpdateArise/reducer';
import keepRoomReducer from 'src/pages/admin/keep-room/api-keep-room/reducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dialog: dialogReducer,
    dashboard: dashboardReducer,
    listService: listServiceReducer,
    establish: establishSlice,
    charge: chargeSlice,
    listArise: listAriseReducer,
    keepRoom: keepRoomReducer,
    updateArise: updateAriseReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

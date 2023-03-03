import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

interface dashboardState {
  loading: true | false;
}

const initialState: Partial<dashboardState> = {
  loading: false,
};

export const fetchDataChart = createAsyncThunk(
  'dashboard/chart',
  async (payload, { rejectWithValue }) => {
    try {
        const response = await fetch('https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json')
        .then((resp) => resp.json())

        return response
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
        .addCase(fetchDataChart.pending, (state, action) => {
            state.loading = true
        })
        .addCase(fetchDataChart.fulfilled, (state, action) => {
            state.loading = false
        })
        .addCase(fetchDataChart.rejected, (state, action) => {
            state.loading = false
        })
  },
});

export const dashboardSliceActions = dashboardSlice.actions;

export const selectDashboardLoading = (state: RootState) => state.dashboard.loading

const dashboardReducer = dashboardSlice.reducer;

export default dashboardReducer;

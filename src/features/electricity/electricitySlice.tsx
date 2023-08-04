import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getListIndexElectricity } from 'src/api/electricity';

const initialState: any = {
  value: [],
};

export const getListIndexElec = createAsyncThunk('electricity/getListIndexElec', async (date: any) => {
  const { data }: any = await getListIndexElectricity(date);
  return data;
});

export const electricitySlice = createSlice({
  name: 'electricity',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListIndexElec.fulfilled, (state, action) => {
      return void (state.value = action.payload);
    });
  },
});

export const {} = electricitySlice.actions;
export default electricitySlice.reducer;
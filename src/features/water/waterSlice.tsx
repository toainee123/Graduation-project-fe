import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getListIndexWater, getListIndexWaterUser } from 'src/api/water';

const initialState: any = {
  value: [],
};

export const getListIndexWter = createAsyncThunk('electricity/getListIndexWter', async (date: any) => {
  const { data }: any = await getListIndexWater(date);
  return data;
});

export const getListIndexWterUser = createAsyncThunk('electricity/getListIndexWterUser', async (date: any) => {
  const noWhitespace = date.replace(/\s/g, '');
  const { data }: any = await getListIndexWaterUser(noWhitespace);
  return data;
});
export const waterSlice = createSlice({
  name: 'water',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListIndexWter.fulfilled, (state, action) => {
      return void (state.value = action.payload);
    });

    builder.addCase(getListIndexWterUser.fulfilled, (state, action) => {
      return void (state.value = action.payload);
    });
  },
});

export const {} = waterSlice.actions;
export default waterSlice.reducer;

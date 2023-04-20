import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'src/store/store';

interface DataWaterType {
  value: any;
}

// Define the initial state using that type
const initialState: DataWaterType = {
  value: [],
};

export const getDataWater = createAsyncThunk('water/getDataWater', async () => {
  const { data }: any = await axios.get('https://6440c167fadc69b8e071d4b4.mockapi.io/api/houses');
  return data;
});

export const waterSlice = createSlice({
  name: 'water',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDataWater.fulfilled, (state, action) => {
      return void (state.value = action.payload);
    });
  },
});

// Other code such as selectors can use the imported `RootState` type

export default waterSlice.reducer;

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

export const getDataWater = createAsyncThunk('water/getDataWater', async (arg: any) => {
  const { data }: any = await axios.get(
    `https://6440c167fadc69b8e071d4b4.mockapi.io/api/houses?month=${arg.month}&year=${arg.year}`
  );
  return data;
});

export const putDataWater = createAsyncThunk('water/putDataWater', async (dataUpdate: any) => {
  const { data }: any = await axios.put(
    `https://6440c167fadc69b8e071d4b4.mockapi.io/api/houses/${dataUpdate.id}`,
    dataUpdate
  );
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
    builder.addCase(putDataWater.fulfilled, (state, action) => {
      return void (state.value = state.value.map((item: any) =>
        item.id === action.payload.id ? action.payload : item
      ));
    });
  },
});

// Other code such as selectors can use the imported `RootState` type
// export const dataWaterAction = waterSlice.actions;
export default waterSlice.reducer;

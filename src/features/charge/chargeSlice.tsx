import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface chargeType {
  value: any;
}

export const getCharge = createAsyncThunk('charge/getData', async () => {
  const { data }: any = await axios.get(`http://localhost:3001/charge`);
  return data;
});

export const getChargeFilter = createAsyncThunk('charge/getChargeFilter', async (filter: any) => {
  console.log(filter);

  const { data }: any = await axios.get(`http://localhost:3001/charge`);
  const filterData = data.filter((el: any) => {
    if (filter.ky == 'Tất cả' && filter.house == 'Tất cả') {
      console.log('hhh');

      return el.year == filter.year && el.month == filter.month;
    }
    if (filter.ky == 'Tất cả' && filter.house != 'Tất cả') {
      console.log('kkk');
      return el.year == filter.year && el.month == filter.month && el.house == filter.house;
    }
    if (filter.house == 'Tất cả' && filter.ky != 'Tất cả') {
      console.log('ksskk');
      return el.year == filter.year && el.month == filter.month && el.ky == filter.ky;
    }
    return el.year == filter.year && el.month == filter.month && el.ky == filter.ky && el.house == filter.house;
  });

  return filterData;
});

export const removeCharge = createAsyncThunk('charge/removeCharge', async (id: any) => {
  await axios.delete(`http://localhost:3001/charge/${id}`);
  return id;
});

// Define the initial state using that type
const initialState: chargeType = {
  value: [],
};

export const chargeSlice = createSlice({
  name: 'charge',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCharge.fulfilled, (state, action) => {
      return void (state.value = action.payload);
    });

    builder.addCase(getChargeFilter.fulfilled, (state, action) => {
      return void (state.value = action.payload);
    });

    builder.addCase(removeCharge.fulfilled, (state, action) => {
      return void (state.value = state.value.filter((item: any) => item.id !== action.payload));
    });

    // builder.addCase(updateAstablishContract.fulfilled, (state, action) => {
    //   toast.success('ahihihi');
    //   return void (state.value = action.payload);
    // });
  },
});
export const {} = chargeSlice.actions;
export default chargeSlice.reducer;

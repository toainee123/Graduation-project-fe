import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface chargeType {
  value: any;
}
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
export const getCharge = createAsyncThunk('charge/getData', async () => {
  const { data }: any = await axios.get(
    `http://localhost:3001/bills?_expand=house&_expand=customer&_expand=room&month=${month}&year=${year}`
  );

  return data;
});

export const getChargeFilter = createAsyncThunk('charge/getChargeFilter', async (filter: any) => {
  if (filter.house == 'Tất cả') {
    const { data }: any = await axios.get(
      `http://localhost:3001/bills?_expand=house&_expand=customer&_expand=room&month=${month}&year=${year}`
    );
    return data;
  } else {
    const { data }: any = await axios.get(
      `http://localhost:3001/bills?_expand=house&_expand=customer&_expand=room&month=${month}&year=${year}&houseId=${filter.house}`
    );
    return data;
  }
});

export const removeCharge = createAsyncThunk('charge/removeCharge', async (id: any) => {
  await axios.delete(`http://localhost:3001/bills/${id}`);

  return id;
});

export const addCharge = createAsyncThunk('charge/addCharge', async (values: any) => {
  const fter = values.valueFilter;
  await axios.post(`http://localhost:3001/bills`, values.dataBill);
  let res;
  if (fter === undefined || fter.house === 'Tất cả') {
    res = await axios.get(
      `http://localhost:3001/bills?_expand=house&_expand=customer&_expand=room&month=${month}&year=${year}`
    );
  } else if (+fter.house === +values.dataBill.houseId) {
    console.log('ahihi');

    res = await axios.get(
      `http://localhost:3001/bills?_expand=house&_expand=customer&_expand=room&month=${month}&year=${year}&houseId=${fter.house}`
    );
  } else if (+fter.house !== +values.dataBill.houseId) {
    console.log('ahuhu');
    res = await axios.get(
      `http://localhost:3001/bills?_expand=house&_expand=customer&_expand=room&month=${month}&year=${year}&houseId=${fter.house}`
    );
  }
  return res?.data;
});

export const updatePaidBill = createAsyncThunk('charge/updatePaidBill', async (value: any) => {
  const fter = value.valueFilter;
  const { data }: any = await axios.patch(`http://localhost:3001/bills/${value.id}`, value);

  let res;
  if (fter === undefined || fter.house === 'Tất cả') {
    res = await axios.get(
      `http://localhost:3001/bills?_expand=house&_expand=customer&_expand=room&month=${month}&year=${year}`
    );
  } else if (+fter.house === +value.house) {
    console.log('ahihi');

    res = await axios.get(
      `http://localhost:3001/bills?_expand=house&_expand=customer&_expand=room&month=${month}&year=${year}&houseId=${fter.house}`
    );
  } else if (+fter.house !== +value.house) {
    console.log('ahuhu');
    res = await axios.get(
      `http://localhost:3001/bills?_expand=house&_expand=customer&_expand=room&month=${month}&year=${year}&houseId=${fter.house}`
    );
  }
  return res?.data;
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

    builder.addCase(addCharge.fulfilled, (state, action) => {
      return void (state.value = action.payload);
    });

    builder.addCase(updatePaidBill.fulfilled, (state, action) => {
      return void (state.value = action.payload);
    });

    // builder.addCase(updateAstablishContract.fulfilled, (state, action) => {
    //   toast.success('ahihihi');
    //   return void (state.value = action.payload);
    // });
  },
});
export const {} = chargeSlice.actions;
export default chargeSlice.reducer;

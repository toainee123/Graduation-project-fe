import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { addBill, deleteBill, getBillNoDate, getBills, getBillsHouse, updatePaid } from 'src/api/charge';

interface chargeType {
  value: any;
}
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const strDay = day < 10 ? '0' + day : day;
const strMonth = month < 10 ? '0' + month : month;
const stringDate = year + '-' + strMonth + '-' + strDay;

export const getCharge = createAsyncThunk('charge/getData', async () => {
  const { data }: any = await getBills(stringDate);
  return data.result;
});

export const getChargeFilter = createAsyncThunk('charge/getChargeFilter', async (filter: any) => {
  console.log(filter);
  const strDay = filter.day < 10 ? '0' + filter.day : filter.day;
  const strMonth = filter.month < 10 ? '0' + filter.month : filter.month;
  const stringDate = year + '-' + strMonth + '-' + strDay;

  if (filter.house == 'Tất cả') {
    const { data }: any = await getBills(stringDate);

    return data.result;
  } else {
    const { data }: any = await getBillsHouse({ date: stringDate, houseId: filter.house });
    return data.result;
  }
});

export const removeCharge = createAsyncThunk('charge/removeCharge', async (id: any) => {
  await deleteBill(id);
  return id;
});

export const addCharge = createAsyncThunk('charge/addCharge', async (values: any) => {
  try {
    await addBill(values.input);
    if (values.filter !== undefined) {
      console.log('ahihi', values.filter);
      const filterValue = values.filter;
      const strDay = filterValue.day < 10 ? '0' + filterValue.day : filterValue.day;
      const strMonth = filterValue.month < 10 ? '0' + filterValue.month : filterValue.month;
      const stringDate = filterValue.year + '-' + strMonth + '-' + strDay;
      const { data }: any = await getBillsHouse({ date: stringDate, houseId: filterValue.house });
      return data.result;
    } else if (values.filter === undefined) {
      console.log('ahihaa');
      const { data }: any = await getBills(stringDate);
      return data.result;
    }
  } catch (error) {
    console.log(error);
  }
});

export const updatePaidBill = createAsyncThunk('charge/updatePaidBill', async (value: any) => {
  await updatePaid({ id: value.id, paid: value.paid });
  return value;
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
      return void (state.value = state.value?.filter((item: any) => item.id != action.payload));
    });

    builder.addCase(addCharge.fulfilled, (state, action) => {
      return void (state.value = action.payload);
    });

    builder.addCase(updatePaidBill.fulfilled, (state, action) => {
      const newState = state.value?.map((item: any) => {
        if (item.id === action.payload.id) {
          return { ...item, paid: action.payload.paid };
        }
        return item;
      });
      return void (state.value = newState);
    });

    // builder.addCase(updateAstablishContract.fulfilled, (state, action) => {
    //   toast.success('ahihihi');
    //   return void (state.value = action.payload);
    // });
  },
});
export const {} = chargeSlice.actions;
export default chargeSlice.reducer;

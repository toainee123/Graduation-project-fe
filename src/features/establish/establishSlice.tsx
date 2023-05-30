import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { RootState } from 'src/store/store';

interface AstablishType {
  value: any;
}

// Define the initial state using that type
const initialState: AstablishType = {
  value: [],
};

export const getAstablishContract = createAsyncThunk('astablish/contract/getAstablishContract', async () => {
  const { data }: any = await axios.get(`http://localhost:3001/astablish/1`);
  return data;
});

export const updateAstablishContract = createAsyncThunk(
  'astablish/contract/updateAstablishContract',
  async (value: any) => {
    const { data }: any = await axios.patch(`http://localhost:3001/astablish/${value.id}`, value);
    console.log(`thanhf cong`);
    return data;
  }
);

export const astablishSlice = createSlice({
  name: 'astablish',
  initialState,
  reducers: {
    changeContentContract: (state, action) => {
      state.value = action.payload;
    },

    changeContentPrintForm80mm: (state, action) => {
      state.value = { ...state.value, sample_bill_80mm: action.payload };
    },

    changeContentPrintFormA5: (state, action) => {
      state.value = { ...state.value, sample_bill_A5: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAstablishContract.fulfilled, (state, action) => {
      return void (state.value = action.payload);
    });

    builder.addCase(updateAstablishContract.fulfilled, (state, action) => {
      toast.success('ahihihi');
      return void (state.value = action.payload);
    });
  },
});
export const { changeContentContract, changeContentPrintForm80mm, changeContentPrintFormA5 } = astablishSlice.actions;
export default astablishSlice.reducer;

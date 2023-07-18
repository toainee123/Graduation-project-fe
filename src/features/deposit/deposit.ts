import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteDeposit, updateDeposit, updateStatus } from "src/api/keep-room";
import { RootState } from "src/store/store";


export const fetchDeposit = createAsyncThunk(
    'deposit/put',
    async (payload: any, { rejectWithValue }) => {
        try {
            //Call api
            const response = await updateStatus(payload?.id, payload?.status);
            //lay data tu api tra ve
            return response.data;

        } catch (error) {
            //Khi call api loi -> return error
            return rejectWithValue(error);
        }
    }
);

export const fetchDeleteDeposit = createAsyncThunk(
    'deposit/delete',
    async (id: number, { rejectWithValue }) => {
        try {
            //Call api
            const response = await deleteDeposit(id);
            //lay data tu api tra ve
            return response.data;

        } catch (error) {
            //Khi call api loi -> return error
            return rejectWithValue(error);
        }
    }
);

export const fetchUpdateDeposit = createAsyncThunk(
    'deposit/update',
    async ({ id, data }: any, { rejectWithValue }) => {
        try {
            //Call api
            const response = await updateDeposit(id, data);
            //lay data tu api tra ve
            return response.data;

        } catch (error) {
            //Khi call api loi -> return error
            return rejectWithValue(error);
        }
    }
);


const initialState = {
    loading: false,
    success: false
};

const depositSlice = createSlice({
    name: 'deposit',
    initialState,
    reducers: {
        resetState(state) {
            state.success = initialState.success
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDeposit.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchDeleteDeposit.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchDeposit.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true
            })
            .addCase(fetchDeleteDeposit.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(fetchDeposit.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(fetchDeleteDeposit.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(fetchUpdateDeposit.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(fetchUpdateDeposit.pending, (state, action) => {
                state.loading = false;
            })
            .addCase(fetchUpdateDeposit.rejected, (state, action) => {
                state.loading = false;
            });

    },
});

export const DepositSliceAction = depositSlice.actions

export const selectFetchHouseLoading = (state: RootState) => state.deposit.loading;
export const selectSuccessDeposit = (state: RootState) => state.deposit.success;

const depositReducer = depositSlice.reducer;

export default depositReducer;

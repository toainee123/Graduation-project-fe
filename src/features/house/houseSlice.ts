import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createDeposit } from "src/api/deposit";
import { RootState } from "src/store/store";


export const fetchHouse = createAsyncThunk(
    'house/post',
    async (payload: any, { rejectWithValue }) => {
        try {
            //Call api
            const response = await createDeposit(payload);
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
};

const houseSlice = createSlice({
    name: 'house',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHouse.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchHouse.fulfilled, (state, action) => {
                // debugger
                state.loading = false;
            })
            .addCase(fetchHouse.rejected, (state, action) => {
                state.loading = false;
            });
    },
});

export const AuthSliceAction = houseSlice.actions

export const selectFetchHouseLoading = (state: RootState) => state.house.loading;

const houseReducer = houseSlice.reducer;

export default houseReducer;

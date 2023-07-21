import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { create, get, remove } from '../../api/house'
import { RootState } from 'src/store/store';
interface houseValue {
    value: any,
    isDelete: boolean,
    isSuccess: boolean
}
const initialState: houseValue = {
    value: [],
    isDelete: false,
    isSuccess: false
}

export const createHouse = createAsyncThunk(
    "house/createHouse",
    async (dataHouse: any, { rejectWithValue }) => {
        try {
            const { data } = await create(dataHouse)
            return data
        } catch (error) {
            return rejectWithValue
        }
    }
)

export const getAllHouse = createAsyncThunk(
    "house/getAllHouse",
    async (rejectWithValue) => {
        try {
            const { data }: any = await get()
            return data
        } catch (error) {
            return rejectWithValue
        }
    }
)

export const deleteHouse = createAsyncThunk(
    "house/deleteHouse",
    async (id: number, rejectWithValue) => {
        try {
            const { data }: any = await remove(id)
            return data
        } catch (error) {
            return rejectWithValue
        }
    }
)

export const houseSlice = createSlice({
    name: 'house',
    initialState,
    reducers: {
        resetIsDelete(state) {
            state.isDelete = initialState.isDelete
        },
        resetIsSuccess(state) {
            state.isSuccess = initialState.isSuccess
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createHouse.fulfilled, (state, action) => {
            state.value = action.payload
            state.isSuccess = true
        })
        builder.addCase(getAllHouse.fulfilled, (state, action) => {
            state.value = action.payload
        })
        builder.addCase(deleteHouse.fulfilled, (state, action) => {
            // state.value = action.payload
            console.log('truee');
            state.isDelete = true
        })
    }
})

export const HouseSliceAction = houseSlice.actions

export const selectIsDelete = (state: RootState) => state.house.isDelete;
export const selectIsSuccess = (state: RootState) => state.house.isSuccess;

export default houseSlice.reducer
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { create, get } from '../../api/house'
interface houseValue {
    value: any
}
const initialState: houseValue = {
    value: []
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

export const houseSlice = createSlice({
    name: 'house',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createHouse.fulfilled, (state, action) => {
            state.value = action.payload
        })
        builder.addCase(getAllHouse.fulfilled, (state, action) => {
            state.value = action.payload
        })
    }
})

export default houseSlice.reducer
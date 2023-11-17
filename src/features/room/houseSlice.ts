import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { create, get, remove, update } from '../../api/house'
import { RootState } from 'src/store/store';
interface houseValue {
    value: any,
    isDelete: boolean,
    isSuccess: boolean,
    idHouse: number,
    filter: any
}
const initialState: houseValue = {
    value: [],
    isDelete: false,
    isSuccess: false,
    idHouse: 0,
    filter: {
        status: '',
        search: ''
    }
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
export const editHouse = createAsyncThunk(
    "house/editHouse",
    async ({ idHouse, value }: any, rejectWithValue) => {
        try {
            return await update({ idHouse, value })
            // return data
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
        },
        funcAddIdHouse(state, action) {
            console.log('action', action.payload);

            state.idHouse = action.payload
        },
        resetIdHouse(state, action) {
            state.idHouse = initialState.idHouse
        },
        filterHouse(state, action) {
            state.filter.status = action.payload.status
            state.filter.search = action.payload.search
        },
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
        builder.addCase(editHouse.fulfilled, (state, action) => {
            // state.value.push(action.payload);
        })
    }
})

export const HouseSliceAction = houseSlice.actions

export const selectIsDelete = (state: RootState) => state.house.isDelete;
export const selectIsSuccess = (state: RootState) => state.house.isSuccess;
export const selectIdHouse = (state: RootState) => state.house.idHouse;
export const selectFilterHouse = (state: RootState) => state.house.filter;

export default houseSlice.reducer
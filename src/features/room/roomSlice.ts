import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiCreateRoomTenant, createMembers, createRoom } from '../../api/room'
interface roomValue {
    value: any
}
const initialState: roomValue = {
    value: []
}

export const createRooms = createAsyncThunk(
    "house/createRoom",
    async (dataRoom: any, { rejectWithValue }) => {
        try {
            const { data } = await createRoom(dataRoom)
            return data
        } catch (error) {
            return rejectWithValue
        }
    }
)

export const createMember = createAsyncThunk(
    "house/createMember",
    async (dataRoom: any, { rejectWithValue }) => {
        try {
            const { data } = await createMembers(dataRoom)
            return data
        } catch (error) {
            return rejectWithValue
        }
    }
)

export const createRoomTenant = createAsyncThunk(
    "house/createRoomTenant",
    async (dataRoom: any, { rejectWithValue }) => {
        try {
            return await apiCreateRoomTenant(dataRoom)
        } catch (error) {
            return rejectWithValue
        }
    }
)

export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createRooms.fulfilled, (state, action) => {
            state.value = action.payload
        })
        builder.addCase(createMember.fulfilled, (state, action) => {
            state.value = action.payload
        })
        builder.addCase(createRoomTenant.fulfilled, (state, action) => {
            // state.value = action.payload
        })

    }
})

export default roomSlice.reducer
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiCreateRoomTenant, apiUpdateRoomTenant, createMembers, createRoom } from '../../api/room'
interface roomValue {
    value: any
}
const initialState: roomValue = {
    value: []
}

export const createRooms = createAsyncThunk(
    "room/createRoom",
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
    "room/createMember",
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
    "room/createRoomTenant",
    async (dataRoom: any, { rejectWithValue }) => {
        try {
            return await apiCreateRoomTenant(dataRoom)
        } catch (error) {
            return rejectWithValue
        }
    }
)
export const editTenant = createAsyncThunk(
    "room/editTenant",
    async ({ roomId, payload }: any, rejectWithValue) => {
        try {
            return await apiUpdateRoomTenant({ roomId, payload })
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
        builder.addCase(editTenant.fulfilled, (state, action) => {
            // state.value.push(action.payload);
        })

    }
})

export default roomSlice.reducer
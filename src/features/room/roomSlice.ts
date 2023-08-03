import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiCreateRoomTenant, apiGetOutRoomTenant, apiUpdateRoom, apiUpdateRoomTenant, createMembers, createRoom, deleteRooms, uploadFileImage } from '../../api/room'
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
export const editRoom = createAsyncThunk(
    "room/editRoom",
    async ({ roomId, payload }: any, { rejectWithValue }) => {
        try {
            return await apiUpdateRoom({ roomId, payload })
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const deleteRoom = createAsyncThunk(
    "room/deleteRoom",
    async (roomId: number, rejectWithValue) => {
        try {
            const { data }: any = await deleteRooms(roomId)
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
            const data = await apiCreateRoomTenant(dataRoom)
            return data
        } catch (error) {
            console.log('err catch', error);

            return rejectWithValue(error)
        }
    }
)
export const editTenant = createAsyncThunk(
    "room/editTenant",
    async ({ roomId, payload }: any, { rejectWithValue }) => {
        try {
            return await apiUpdateRoomTenant({ roomId, payload })
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const GetOutRoomTenant = createAsyncThunk(
    "room/GetOutRoomTenant",
    async (roomId: any, { rejectWithValue }) => {
        try {
            const { data }: any = await apiGetOutRoomTenant(roomId)
            console.log('1222');

            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const uploadFile = createAsyncThunk(
    "room/uploadFile",
    async (file: any, { rejectWithValue }) => {
        try {
            const { data }: any = await uploadFileImage(file)
            console.log('1222');

            return data
        } catch (error) {
            return rejectWithValue(error)
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
        builder.addCase(editRoom.fulfilled, (state, action) => {
            // state.value.push(action.payload);
        })
        builder.addCase(deleteRoom.fulfilled, (state, action) => {
            // state.value.push(action.payload);
        })
        builder.addCase(createMember.fulfilled, (state, action) => {
            state.value = action.payload
        })
        builder.addCase(createRoomTenant.fulfilled, (state, action) => {
            // state.value = action.payload
        })
        builder.addCase(GetOutRoomTenant.fulfilled, (state, action) => {
            // state.value = action.payload
        })
        builder.addCase(editTenant.fulfilled, (state, action) => {
            // state.value.push(action.payload);
        })

    }
})

export default roomSlice.reducer
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createRoom } from '../../api/room'
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

export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createRooms.fulfilled, (state, action) => {
            state.value = action.payload
        })

    }
})

export default roomSlice.reducer
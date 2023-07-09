import { createSlice } from '@reduxjs/toolkit'
import { getApiKeepRoom, postApiKeepRoom } from './api';

const initialState = {
    keepRoom: [],
    status: null,
}

export const keepRoomSlice = createSlice({
    name: 'keepRoom',
    initialState,
    extraReducers: {
        [getApiKeepRoom.fulfilled]: (state, action) => {
            let response = (action.payload);
            state.listArise = response;
            state.status = "Thành công";
        },
        [postApiKeepRoom.fulfilled]: (state, action) => {
            let response = (action.payload);
            state.listArise = response;
            state.status = "Thành công";
        },
    },
})
export default keepRoomSlice.reducer
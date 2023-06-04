import { createSlice } from '@reduxjs/toolkit'
import { getApiArise, postApiArise } from './api';

const initialState = {
    addArise: null,
    status: null,
}

export const updateAriseSlice = createSlice({
    name: 'updateAriseStore',
    initialState,
    extraReducers: {
        [postApiArise.fulfilled]: (state, action) => {
            let response = (action.payload);
            state.addArise = response;
            state.status = "Thành công";
        },
    },
})
export default updateAriseSlice.reducer
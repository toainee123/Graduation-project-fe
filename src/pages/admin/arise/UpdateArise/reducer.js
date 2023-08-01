import { createSlice } from '@reduxjs/toolkit'
import { getApiDetailArise, postApiArise, putApiArise } from './api';

const initialState = {
    addArise: null,
    updateArise: null,
    detailArise: null,
    status: null,
}
export const updateAriseSlice = createSlice({
    name: 'updateAriseStore',
    initialState,
    reducers: {
        clearStore: () => initialState, // Trả về trạng thái ban đầu
    },
    extraReducers: {
        [postApiArise.fulfilled]: (state, action) => {
            let response = (action.payload);
            state.addArise = response;
            state.status = "Thành công";
        },
        [getApiDetailArise.fulfilled]: (state, action) => {
            let response = (action.payload);
            state.detailArise = response;
            state.status = "Thành công";
        },
        [putApiArise.fulfilled]: (state, action) => {
            let response = (action.payload);
            state.updateArise = response;
            state.status = "Thành công";
        },
    },
})

export const { clearStore } = updateAriseSlice.actions;
export default updateAriseSlice.reducer
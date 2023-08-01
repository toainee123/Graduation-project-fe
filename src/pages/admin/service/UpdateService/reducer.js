import { createSlice } from '@reduxjs/toolkit'
import { getApiDetailService, postApiService, putApiService } from './api';

const initialState = {
    addService: null,
    updateService: null,
    detailService: null,
    status: null,
}
export const updateServiceSlice = createSlice({
    name: 'updateServiceStore',
    initialState,
    reducers: {
        clearStore: () => initialState, // Trả về trạng thái ban đầu
    },
    extraReducers: {
        [postApiService.fulfilled]: (state, action) => {
            let response = (action.payload);
            state.addService = response;
            state.status = "Thành công";
        },
        [getApiDetailService.fulfilled]: (state, action) => {
            let response = (action.payload);
            state.detailService = response;
            state.status = "Thành công";
        },
        [putApiService.fulfilled]: (state, action) => {
            let response = (action.payload);
            state.updateService = response;
            state.status = "Thành công";
        },
    },
})

export const { clearStore } = updateServiceSlice.actions;
export default updateServiceSlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import { getApiService, postApiService } from './api';

const initialState = {
    value: 0,
    listService: null
}

export const listServiceSlice = createSlice({
    name: 'listServiceStores',
    initialState,
    extraReducers: {
        [getApiService.fulfilled]: (state, action) => {
            debugger
            let response = (action.payload);
            state.listService = response;
            state.status = "Thành công";
        },
        [postApiService.fulfilled]: (state, action) => {
            let response = (action.payload);
            state.listService = response;
            state.status = "Thành công";
        },
        // [deleteApiService.fulfilled]: (state, action) => {
        //     let response = (action.payload);
        //     state.deleteService = response;
        //     state.status = "Thành công";
        // },
    },
})

export default listServiceSlice.reducer
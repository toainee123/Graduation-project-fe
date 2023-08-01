import { createSlice } from '@reduxjs/toolkit'
import { getApiService, postApiService } from './api';

const initialState = {
    addService: null,
    status: null,
}
export const updateServiceSlice = createSlice({
    name: 'updateServiceStore',
    initialState,
    extraReducers: {
        [postApiService.fulfilled]: (state, action) => {
            let response = (action.payload);
            state.addService = response;
            state.status = "Thành công";
        },
    },
})
export default updateServiceSlice.reducer
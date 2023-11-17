import { createSlice } from '@reduxjs/toolkit'
import { deleteApiArise, getApiArise, postApiArise } from './api';

const initialState = {
    listArise: [],
    status: null,
    deleteArise: null
}

export const listAriseSlice = createSlice({
    name: 'listAriseStore',
    initialState,
    extraReducers: {
        [getApiArise.fulfilled]: (state, action) => {
            let response = (action.payload);
            state.listArise = response;
            state.status = "Thành công";
        },
        [postApiArise.fulfilled]: (state, action) => {
            let response = (action.payload);
            state.listArise = response;
            state.status = "Thành công";
        },
        [deleteApiArise.fulfilled]: (state, action) => {
            let response = (action.payload);
            state.deleteArise = response;
            state.status = "Thành công";
        },
    },
})
export default listAriseSlice.reducer
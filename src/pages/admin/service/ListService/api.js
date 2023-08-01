import axios from "axios";
import { baseApi, baseApiServices } from "./constant";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getApiService = createAsyncThunk("listServiceStore/getApiService", async () => {
    let response = await axios.get(baseApiServices);
    let json = await response.data;
    return json;
});
export const postApiService = createAsyncThunk("listServiceStore/postApiArise", async () => {
    let response = await axios.post(baseApi);
    let json = await response.data;
    return json;
    //det som returneras här, kommer att bli vår action.payload
});

// export const deleteApiArise = createAsyncThunk("listServiceStore/deleteApiArise", async (id) => {
//     let response = await axios.delete(`${baseApiArise}/${id}`);
//     let json = await response.data;
//     return json;
// });
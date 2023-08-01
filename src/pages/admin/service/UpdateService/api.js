import axios from "axios";
import { baseApiService } from "./constant";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getApiService = createAsyncThunk("updateServiceStore/getApiService", async () => {
    let response = await axios.get(baseApiService);
    let json = await response.data;
    return json;
    //det som returneras här, kommer att bli vår action.payload
});
export const getApiDetailService = createAsyncThunk("updateServiceStore/getApiDetailService", async (id) => {
    let response = await axios.get(`${baseApiService}/${id}`);
    let json = await response.data;
    return json;
    //det som returneras här, kommer att bli vår action.payload
});
export const postApiService = createAsyncThunk("updateServiceStore/postApiService", async (data) => {
    let response = await axios.post(baseApiService, data);
    let json = await response.data;
    return json;
    //det som returneras här, kommer att bli vår action.payload
});
export const putApiService = createAsyncThunk("updateServiceStore/putApiService", async (data) => {
    let response = await axios.put(`${baseApiService}/${data.id}`, data);
    let json = await response.data;
    return json;
    //det som returneras här, kommer att bli vår action.payload
});
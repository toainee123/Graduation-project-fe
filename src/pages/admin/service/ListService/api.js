import axios from "axios";
import { baseApiService } from "./constant";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getApiService = createAsyncThunk("listServiceStore/getApiService", async () => {
    let response = await axios.get(baseApiService);
    let json = await response.data;
    return json;
    //det som returneras här, kommer att bli vår action.payload
});
export const postApiService = createAsyncThunk("listServiceStore/postApiService", async () => {
    let response = await axios.post(baseApiService);
    let json = await response.data;
    return json;
    //det som returneras här, kommer att bli vår action.payload
});
export const deleteApiService = createAsyncThunk("listServiceStore/deleteApiService", async (id) => {
    let response = await axios.delete(`${baseApiService}/${id}`);
    let json = await response.data;
    return json;
    //det som returneras här, kommer att bli vår action.payload
});
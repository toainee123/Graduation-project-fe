import axios from "axios";
import { baseApiService } from "./constant";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getApiService = createAsyncThunk("listServiceStore/getApiService", async () => {
    let response = await axios.get(baseApiService);
    let json = await response.data;
    return json;
    //det som returneras här, kommer att bli vår action.payload
});
export const postApiService = createAsyncThunk("listServiceStore/postApiService", async (data) => {
    let response = await axios.post(baseApiService, data);
    let json = await response.data;
    return json;
    //det som returneras här, kommer att bli vår action.payload
});
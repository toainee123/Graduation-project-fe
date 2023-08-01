import axios from "axios";
import { baseApiArise } from "./constant";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getApiArise = createAsyncThunk("updateAriseStore/getApiArise", async () => {
    let response = await axios.get(baseApiArise);
    let json = await response.data;
    return json;
    //det som returneras här, kommer att bli vår action.payload
});
export const postApiArise = createAsyncThunk("updateAriseStore/postApiArise", async (data) => {
    let response = await axios.post(baseApiArise, data);
    let json = await response.data;
    return json;
    //det som returneras här, kommer att bli vår action.payload
});
import axios from "axios";
import { baseApiArise, baseApiAriseSearch } from "./constant";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getApiArise = createAsyncThunk("listAriseStore/getApiArise", async () => {
    let response = await axios.get(baseApiAriseSearch);
    let json = await response.data;
    return json;
    //det som returneras här, kommer att bli vår action.payload
});
export const postApiArise = createAsyncThunk("listAriseStore/postApiArise", async () => {
    let response = await axios.post(baseApiAriseSearch);
    let json = await response.data;
    return json;
    //det som returneras här, kommer att bli vår action.payload
});
export const deleteApiArise = createAsyncThunk("listAriseStore/deleteApiArise", async (id) => {
    let response = await axios.delete(`${baseApiArise}/${id}`);
    let json = await response.data;
    return json;
    //det som returneras här, kommer att bli vår action.payload
});
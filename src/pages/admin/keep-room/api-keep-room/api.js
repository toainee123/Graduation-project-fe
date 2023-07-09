import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseApiKeepRooom } from "./constants";


export const getApiKeepRoom = createAsyncThunk("listAriseStore/getApiArise", async () => {
    let response = await axios.get(baseApiKeepRooom);
    let json = await response.data;
    return json;
    //det som returneras här, kommer att bli vår action.payload
});
export const postApiKeepRoom = createAsyncThunk("listAriseStore/postApiArise", async () => {
    let response = await axios.post(baseApiKeepRooom);
    let json = await response.data;
    return json;
    //det som returneras här, kommer att bli vår action.payload
});
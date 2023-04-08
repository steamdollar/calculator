import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

const initialState = {
    value : null,
    status : null
}

export const tradingRecordSlice = createSlice({
    name : "tradingRecord",
    initialState,
    reducers : {

    },
    extraReducers: (state) => {
        
    }
})

export const getTradeInfo = createAsyncThunk(
    "GET/GETTRADING", async (data) => {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/trading/getTradingRecord`,
            data
        )
        alert(response.data)
    }
)

export default tradingRecordSlice.reducer
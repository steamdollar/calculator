import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const defaultSet = {
        loss: 0,
        position: "n/a",
        entry: 0,
        stopLoss: 0,
        lossDiff: 0,
        leverage: 0,
        takeProfit: 0,
        profitDiff: 0,
        sr: 0,
        ticker: "",
};

const initialState = {
        ...defaultSet,
        loading: false,
        status: null,
};

export const tradingRecordSlice = createSlice({
        name: "tradingRecord",
        initialState,
        reducers: {
                inputLoss: (state, action) => {
                        state.defaultSet.loss = action.payload;
                },
        },
        extraReducers: (state) => {
                state.addCase(getTradeRecord.fulfilled, (state, action) => {
                        state.status = null;
                })
                        .addCase(getTradeRecord.pending, (state, action) => {
                                state.status = "loading";
                        })
                        .addCase(getTradeRecord.rejected, (state, action) => {
                                state.status = null;
                        });
        },
});

export const getTradeRecord = createAsyncThunk(
        "GET/GETTRADING",
        async (data) => {
                const response = await axios.get(
                        `${process.env.REACT_APP_BACKEND_SERVER}/trading/getTradingRecord`,
                        data
                );
                alert(response.data);
        }
);

export const { inputLoss } = tradingRecordSlice.actions;

export default tradingRecordSlice.reducer;

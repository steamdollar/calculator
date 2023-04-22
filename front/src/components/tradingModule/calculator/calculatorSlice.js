import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const testSet = {
        loss: 3,
        position: "long",
        entry: 100.5,
        stopLoss: 98,
        lossDiff: 2,
        leverage: 1.5,
        takeProfit: 110,
        profitDiff: 10,
        sr: 5,
        ticker: "btcusdt",
};

// const defaultSet = {
//         loss: 0,
//         position: "n/a",
//         entry: 0,
//         stopLoss: 0,
//         lossDiff: 0,
//         leverage: 0,
//         takeProfit: 0,
//         profitDiff: 0,
//         sr: 0,
//         ticker: "",
// };

const initialState = {
        value: testSet,
        status: null,
};

export const calculatorSlice = createSlice({
        name: "calculator",
        initialState,
        reducers: {
                inputLoss: (state, action) => {
                        state.value.loss = action.payload;
                        console.log(current(state));
                },
                selectPosition: (state, action) => {
                        state.value.position = action.payload;
                },
                selectEntry: (state, action) => {
                        state.value.entry = action.payload;
                },
                selectSl: (state, action) => {
                        state.value.stopLoss = action.payload;
                },
                showLossDiff: (state, action) => {
                        state.value.lossDiff = action.payload;
                },
                showLeverage: (state, action) => {
                        state.value.leverage = action.payload;
                },
                selectTP: (state, action) => {
                        state.value.takeProfit = action.payload;
                },
                showProfitDiff: (state, action) => {
                        state.value.profitDiff = action.payload;
                },
                showSR: (state, action) => {
                        state.value.sr = action.payload;
                },
                selectTicker: (state, action) => {
                        state.value.ticker = action.payload;
                },
        },
        extraReducers: (state) => {
                state.addCase(saveTradeInfo.fulfilled, (state, action) => {
                        state.status = null;
                })
                        .addCase(saveTradeInfo.pending, (state, action) => {
                                state.status = "loading";
                        })
                        .addCase(saveTradeInfo.rejected, (state, action) => {
                                state.status = null;
                        });
        },
});

export const saveTradeInfo = createAsyncThunk(
        "POST/SAVETRADING",
        async (tableSaved) => {
                const response = await axios.post(
                        `${process.env.REACT_APP_BACKEND_SERVER}/trading/saveTradingData`,
                        tableSaved
                );
                alert(response.data.msg);
        }
);

export const {
        selectPosition,
        inputLoss,
        selectEntry,
        selectSl,
        showLeverage,
        showLossDiff,
        showProfitDiff,
        showSR,
        selectTP,
        selectTicker,
} = calculatorSlice.actions;
export default calculatorSlice.reducer;

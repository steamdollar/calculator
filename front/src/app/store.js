import { configureStore } from "@reduxjs/toolkit";
import calculatorReducer from "../components/tradingModule/calculator/calculatorSlice.js";
import tradingRecordReducer from "../components/tradingModule/tradingRecord/tradingRecordSlice.js";

export const store = configureStore({
        reducer: {
                calculator: calculatorReducer,
                tradingList: tradingRecordReducer,
        },
});

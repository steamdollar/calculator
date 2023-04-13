import { configureStore } from "@reduxjs/toolkit";
import calculatorReducer from "../components/tradingModule/calculator/calculatorSlice.js";
import tradingRecordReducer from "../components/tradingModule/tradingRecord/tradingRecordSlice.js";
import walletRegisterReducer from "../components/walletModule/registerForm/walletSlice";

export const store = configureStore({
        reducer: {
                calculator: calculatorReducer,
                tradingList: tradingRecordReducer,
                walletRegister: walletRegisterReducer,
        },
});

import { configureStore } from "@reduxjs/toolkit";
import calculatorReducer from "../components/tradingModule/calculator/calculatorSlice.js";
import tradingRecordReducer from "../components/tradingModule/tradingRecord/tradingRecordSlice.js";
import walletRegisterReducer from "../components/walletModule/registerForm/walletSlice";
import walletListReducer from "../components/walletModule/walletListModule/walletListSlice.js";
import getBalanceReducer from "../components/BalanceModule/balanceSlice";
import checkAddressReducer from "../components/coinModule/coinRegisterSlice";
import getTokenListReducer from "../components/coinModule/getCoinListSlice.js";

export const store = configureStore({
        reducer: {
                calculator: calculatorReducer,
                tradingList: tradingRecordReducer,
                walletRegister: walletRegisterReducer,
                walletList: walletListReducer,
                balanceGetter: getBalanceReducer,
                addressInfo: checkAddressReducer,
                getTokenList: getTokenListReducer,
        },
});

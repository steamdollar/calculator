import { configureStore } from '@reduxjs/toolkit'
import calculatorReducer from '../components/calculator/calculatorSlice.js'
import tradingRecordReducer from '../components/tradingRecord/tradingRecordSlice.js'

export const store = configureStore({
    reducer : {
        calculator: calculatorReducer,
        tradingList : tradingRecordReducer,
    }
})
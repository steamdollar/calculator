import { configureStore } from '@reduxjs/toolkit'
import calculatorReducer from '../components/calculator/calculatorSlice.js'

export const store = configureStore({
    reducer : {
        calculator: calculatorReducer,
    }
})
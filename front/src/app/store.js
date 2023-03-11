import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../feature/counter/counterSlice.js'

export const store = configureStore({
    reducer : {
        counter : counterReducer
    }
})
import { createSlice, current } from "@reduxjs/toolkit"

const initialState = {
    value : {
        loss : 0, 
        position : "n/a", 
        entry : 0, 
        stopLoss : 0, 
        lossDiff : 0,
        leverage : 0,
        takeProfit : 0,
        profitDiff : 0,
        sr : 0 
    }
}

export const calculatorSlice = createSlice({
    name : "calculator",
    initialState,
    reducers : {
        inputLoss : (state, action) => {
            state.value.loss = action.payload
            // console.log(action)
            // console.log(current(state))
        },
        selectPosition : (state, action) => {
            state.value.position = action.payload
        },
        selectEntry : (state, action) => {
            state.value.entry = action.payload
        },
        selectSl : (state, action) => {
            state.value.stopLoss = action.payload
        },
        showLossDiff : (state, action) => {
            state.value.lossDiff = action.payload
        },
        showLeverage : (state, action) => {
            state.value.leverage = action.payload
        },
        selectTP : (state, action) => {
            state.value.takeProfit = action.payload
        },
        showProfitDiff : (state, action) => {
            state.value.profitDiff = action.payload
        },
        showSR : (state, action) => {
            state.value.sr = action.payload
        }

    }
})

export const {selectPosition, inputLoss, selectEntry, selectSl, showLeverage, showLossDiff, showProfitDiff, showSR, selectTP} = calculatorSlice.actions
export default calculatorSlice.reducer
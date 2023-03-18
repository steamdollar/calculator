import { createSlice, current } from "@reduxjs/toolkit"

const initialState = {
    value : {
        loss : "", 
        position : "n/a", 
        entry : "", 
        stopLoss : "", 
        lossDiff : "",
        leverage : "",
        takeProfit : "",
        profitDiff : "",
        sr : "" ,
        ticker : "",
    }
}

export const calculatorSlice = createSlice({
    name : "calculator",
    initialState,
    reducers : {
        // TODO : 숫자값 or 문자값만 타이핑 가능하도록
        inputLoss : (state, action) => {
            state.value.loss = action.payload
            console.log(action.payload)
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
        },
        selectTicker : (state, action) => {
            state.value.ticker = action.payload
        }
    }
})

export const {selectPosition, inputLoss, selectEntry, selectSl, 
    showLeverage, showLossDiff, showProfitDiff, showSR, selectTP, selectTicker} = calculatorSlice.actions
export default calculatorSlice.reducer
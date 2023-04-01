import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { request } from "../../util/axios"

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
        sr : 0 ,
        ticker : "",
    },
    status : null
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
    },
    extraReducers: (state) => {
        state.addCase(saveTradeInfo.fulfilled, (state, action) => {
            state.status = null
        })
        .addCase(saveTradeInfo.pending, (state, action) => {
            state.status = "loading"
        })
        .addCase(saveTradeInfo.rejected, (state, action) => {
            state.status = null
        })
    }
})

export const saveTradeInfo = createAsyncThunk(
        "POST/SAVETRADING", async (tradingInfo) => {
            console.log(tradingInfo)
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/as`,
                tradingInfo
                
            )

            console.log(response.data)
        }
)

export const {selectPosition, inputLoss, selectEntry, selectSl, 
    showLeverage, showLossDiff, showProfitDiff, showSR, selectTP, selectTicker} = calculatorSlice.actions
export default calculatorSlice.reducer
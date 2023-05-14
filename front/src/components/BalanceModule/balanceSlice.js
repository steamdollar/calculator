import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

const testset = {
        address: null,
        balances: [],
        status: null,
};

const initialState = {
        ...testset,
};

export const getBalanceSlice = createSlice({
        name: "getBalance",
        initialState,
        reducers: {
                setAddress: (state, action) => {
                        state.address = action.payload;
                },
        },
        extraReducers: (state) => {
                state.addCase(getBalanceInfo.fulfilled, (state, action) => {
                        const index = state.balances.findIndex(
                                (item) =>
                                        item.network === action.payload.network
                        );

                        if (index !== -1) {
                                state.balances[index] = action.payload;
                        } else {
                                state.balances.push(action.payload);
                        }

                        // console.log(current(state.balances));
                        state.status = null;
                })
                        .addCase(getBalanceInfo.pending, (state) => {
                                state.status = "loading";
                        })
                        .addCase(getBalanceInfo.rejected, (state, action) => {
                                state.status = "error";
                        });
        },
});

export const getBalanceInfo = createAsyncThunk(
        "GET/GETBALANCE",
        async ({ address, network }) => {
                const response = await axios.get(
                        `${process.env.REACT_APP_BACKEND_SERVER}/balance/getBalance?address=${address}&chain=${network}`
                );
                if (response.data.status === 1) {
                        const err = new Error(response.data.msg);
                        alert(err);
                        throw err;
                }

                const balanceWithNetwork = {
                        network,
                        balances: response.data.balances,
                };
                return balanceWithNetwork;
        }
);

export const { setAddress, setNetwork } = getBalanceSlice.actions;

export default getBalanceSlice.reducer;

import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";
import { networkList } from "../../util/network";
import { axiosConfig } from "../../util/axios";

const initialState = {
        chain: networkList[0],
        address: null,
        tokenInfo: null,
        status: null,
};

export const checkAddressIsToken = createSlice({
        name: "addressInfo",
        initialState,
        reducers: {
                setChain: (state, action) => {
                        state.chain = action.payload;
                },
                setAddress: (state, action) => {
                        // 0x4d224452801aced8b2f0aebe155379bb5d594381
                        state.address = action.payload;
                },
        },
        extraReducers: (state) => {
                state.addCase(getAddressInfo.fulfilled, (state, action) => {
                        state.tokenInfo = action.payload;
                        state.status = null;
                })
                        .addCase(getAddressInfo.pending, (state) => {
                                state.status = "loading";
                        })
                        .addCase(getAddressInfo.rejected, (state) => {
                                state.status = "error";
                        })
                        .addCase(saveCoinInfo.fulfilled, (state, action) => {
                                if (action.payload.status === 0) {
                                        alert(action.payload.msg);
                                        state.status = null;
                                        state.address = null;
                                        state.tokenInfo = null;
                                }
                        })
                        .addCase(saveCoinInfo.pending, (state) => {
                                state.status = "loading";
                        })
                        .addCase(saveCoinInfo.rejected, (state) => {
                                state.status = "error";
                        })
                        .addCase(getCoinList.pending, (state) => {
                                state.status = "loading";
                        })
                        .addCase(getCoinList.fulfilled, (state, action) => {
                                state.coinList = action.payload;
                                state.status = null;
                        });
        },
});

export const getAddressInfo = createAsyncThunk(
        "GET/CHECKADDRESS",
        async ({ address, chain }) => {
                const response = await axiosConfig.get(
                        `/coin/checkCoinInfo?address=${address}&chain=${chain}`
                );
                if (response.data.status === 1) {
                        const err = new Error(response.data.msg);
                        alert(err);
                        throw err;
                }
                return response.data;
        }
);

export const saveCoinInfo = createAsyncThunk(
        "POST/SAVEADDRESS",
        async ({ address, chain, tokenInfo }) => {
                const response = await axiosConfig.post(`/coin/saveCoinInfo`, {
                        ca: address,
                        chain,
                        symbol: tokenInfo.symbol,
                });

                if (response.data.status === 1) {
                        const err = new Error(response.data.msg);
                        alert(err);
                        throw err;
                }
                return response.data;
        }
);

export const getCoinList = createAsyncThunk(
        "GET/GETCOINLIST",
        async ({ network }) => {
                const response = await axiosConfig.get(
                        `/coin/getCoinList?network=${network}`
                );

                if (response.data.status !== 0) {
                        const err = new Error(response.data.msg);
                        alert(err);
                        throw err;
                }
                return response.data;
        }
);

export const { setAddress, setChain } = checkAddressIsToken.actions;

export default checkAddressIsToken.reducer;

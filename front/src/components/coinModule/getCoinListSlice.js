import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosConfig } from "../../util/axios";

const initialState = {
        coinList: [],
        status: null,
};

export const getTokenList = createSlice({
        name: "addressInfo",
        initialState,
        reducers: {},
        extraReducers: (state) => {
                state.addCase(getCoinList.pending, (state) => {
                        state.status = "loading";
                })
                        .addCase(getCoinList.fulfilled, (state, action) => {
                                const index = state.coinList.findIndex(
                                        (item) =>
                                                item.chain ===
                                                action.payload.chain
                                );

                                if (index !== -1) {
                                        state.coinList[index] = action.payload;
                                } else {
                                        state.coinList.push(action.payload);
                                }

                                state.status = null;
                        })
                        .addCase(getCoinList.rejected, (state) => {
                                state.status = "failed";
                        });
        },
});

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

export default getTokenList.reducer;

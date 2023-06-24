import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";
import { networkList } from "../../util/network";

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
                        });
        },
});

export const getAddressInfo = createAsyncThunk(
        "GET/CHECKADDRESS",
        async ({ address, chain }) => {
                const response = await axios.get(
                        `${process.env.REACT_APP_BACKEND_SERVER}/coin/checkCoinInfo?address=${address}&chain=${chain}`
                );
                if (response.data.status === 1) {
                        const err = new Error(response.data.msg);
                        alert(err);
                        throw err;
                }
                return response.data;
        }
);

export const { setAddress, setChain } = checkAddressIsToken.actions;

export default checkAddressIsToken.reducer;

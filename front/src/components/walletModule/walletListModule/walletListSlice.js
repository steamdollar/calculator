import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { data: [] };

export const walletListSlice = createSlice({
        name: "walletList",
        initialState,
        reducers: {},
        extraReducers: (state) => {
                state.addCase(getWalletInfo.fulfilled, (state, action) => {
                        state.status = "success";
                        state.data = action.payload;
                })
                        .addCase(getWalletInfo.pending, (state, action) => {
                                state.status = "loading";
                        })
                        .addCase(getWalletInfo.rejected, (state, action) => {
                                state.status = "error";
                                state.error = action.error.message;
                        });
        },
});

export const getWalletInfo = createAsyncThunk("GET/GETWALLETINFO", async () => {
        const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_SERVER}/wallet/getmywalletinfo`
        );

        if (response.data.status !== undefined) {
                alert(response.data.msg);
                return;
        }

        return response.data;
});

export default walletListSlice.reducer;

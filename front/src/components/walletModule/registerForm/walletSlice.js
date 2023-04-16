import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const testSet = {
        address: "0xcA257Dc2E925c67D396725A48FfB8A913f3e3CE8",
        affiliation: "shield",
        purpose: "airdrop",
};

const initialState = {
        ...testSet,
};

export const walletRegisterSlice = createSlice({
        name: "walletRegister",
        initialState,
        reducers: {
                inputAddress: (state, action) => {
                        state.address = action.payload;
                },
                inputAffiliation: (state, action) => {
                        state.affiliation = action.payload;
                },
                inputPurpose: (state, action) => {
                        state.purpose = action.payload;
                },
        },
        extraReducers: (state) => {
                state.addCase(saveWalletInfo.fulfilled, (state, action) => {
                        state.status = null;
                        state.address = "";
                        state.purpose = "";
                        state.affiliation = "";
                })
                        .addCase(saveWalletInfo.pending, (state) => {
                                state.status = "loading";
                        })
                        .addCase(saveWalletInfo.rejected, (state, action) => {
                                state.status = null;
                        });
        },
});

export const saveWalletInfo = createAsyncThunk(
        "POST/SAVEWALLET",
        async (wallet) => {
                const response = await axios.post(
                        `${process.env.REACT_APP_BACKEND_SERVER}/wallet/saveWallet`,
                        wallet
                );

                if (response.data.status === 1) {
                        const err = new Error(response.data.msg);
                        alert(err);
                        throw err;
                } else {
                        alert(response.data.msg);
                }
        }
);

export const { inputAddress, inputAffiliation, inputPurpose } =
        walletRegisterSlice.actions;

export default walletRegisterSlice.reducer;

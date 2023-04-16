import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { getWalletInfo } from "./walletListSlice";

export const WalletList = () => {
        const dispatch = useDispatch();
        const walletList = useSelector((state) => state.walletList.data);

        useEffect(() => {
                dispatch(getWalletInfo());
        }, []);

        return (
                <div style={{ border: "1px" }}>
                        {/* {walletList} */}
                        <button onClick={() => console.log(walletList)}>
                                asdasd
                        </button>
                </div>
        );
};

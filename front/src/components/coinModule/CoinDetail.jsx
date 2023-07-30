import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { saveCoinInfo } from "./coinRegisterSlice";
import { alertIfSyntaxError } from "../../util/checkValue";
import { MyButton } from "../common/commons";

const CoinInfo = styled.div`
        width: 50%;
        text-align: center;
        margin-top: 2% !important;

        > div {
                text-align: center;
                margin: 0 0 1vh 0;
                color: green;
                font-style: bold;
                font-size: 20px;
        }
`;

export const CoinDetail = () => {
        const dispatch = useDispatch();
        const addrInfoDTO = useSelector((state) => state.addressInfo);
        const tokenInfo = useSelector((state) => state.addressInfo.tokenInfo);

        const saveToken = () => {
                if (!alertIfSyntaxError(addrInfoDTO)) {
                        return;
                }

                dispatch(saveCoinInfo(addrInfoDTO));

                document.getElementById("coinInput").value = "";
        };

        return (
                <>
                        <CoinInfo>
                                <div>name :{tokenInfo.name}</div>
                                <div>symbol :{tokenInfo.symbol}</div>
                                <div
                                        style={{
                                                marginBottom: "3vh",
                                        }}
                                >
                                        decimals:
                                        {tokenInfo.decimals}
                                </div>
                        </CoinInfo>
                        <MyButton onClick={saveToken} style={{ right: "5%" }}>
                                Register
                        </MyButton>
                </>
        );
};

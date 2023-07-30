import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setAddress, getAddressInfo } from "./coinRegisterSlice";
import { MyButton } from "../common/commons";
import { alertIfSyntaxError, isProperAddress } from "../../util/checkValue";

const CoinInput = styled.input`
        width: 50%;
        border: none;
        border-bottom: 1px solid gray;
        padding: 0.5%;

        text-align: center;
        font-size: 15px;
        margin-right: 2.5vh;
`;

export const TokenInfoInput = () => {
        const dispatch = useDispatch();
        const addrInfoDTO = useSelector((state) => state.addressInfo);

        const setCA = (e) => {
                dispatch(setAddress(e.target.value));
        };

        const getTokenData = () => {
                if (!alertIfSyntaxError(addrInfoDTO)) {
                        return;
                }

                dispatch(getAddressInfo(addrInfoDTO));
        };

        return (
                <>
                        <span
                                style={{
                                        marginBottom: "4%",
                                        margin: "0 auto",
                                }}
                        >
                                <span>
                                        <span
                                                style={{
                                                        marginLeft: "3%",
                                                        marginRight: "3%",
                                                        fontSize: "18px",
                                                }}
                                        >
                                                Address{" "}
                                        </span>
                                        <CoinInput
                                                placeholder="input token address"
                                                onChange={setCA}
                                                id="coinInput"
                                        />

                                        <MyButton onClick={getTokenData}>
                                                check
                                        </MyButton>
                                </span>
                        </span>
                </>
        );
};

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
        getAddressInfo,
        setAddress,
        setChain,
        saveCoinInfo,
} from "./coinRegisterSlice";
import { networkList } from "../../util/network";
import { isProperAddress } from "../../util/checkValue";

const Wrapper = styled.div`
        margin: 0 auto;
        width: 80%;

        > div {
                margin: 0 auto;
                width: 60%;
                padding: 0 10%;
        }
`;

const CoinSelectBox = styled.span`
        > select {
                width: 18%;
                height: 4vh;
                text-align: center;
                font-size: 16px;
                min-height: 24px;
        }
`;

const CoinInput = styled.input`
        width: 55%;
        border: none;
        border-bottom: 1px solid gray;
        padding: 0.5%;

        text-align: center;
        font-size: 15px;
        margin-right: 2vh;
`;

const TokenInfo = styled.div`
        margin: 0 auto;

        > div {
                margin: 0 auto;
        }
`;

const MyButton = styled.span`
        border: 1px solid gray;
        border-radius: 10px;
        padding: 0.5% 1%;

        &:hover {
                background: #eeeeee;
        }
`;

const CoinInfo = styled.div`
        width: 50%;
        text-align: center;

        > div {
                text-align: center;
                margin: 0 0 1vh 0;
                color: green;
        }
`;

export const CoinRegisterForm = () => {
        const dispatch = useDispatch();
        const addrInfoDTO = useSelector((state) => state.addressInfo);
        const [tab, setTab] = useState("Register");

        const setCA = (e) => {
                dispatch(setAddress(e.target.value));
        };

        const chooseChain = (e) => {
                dispatch(setChain(e.target.value));
        };

        const getTokenData = () => {
                if (!isProperAddress(addrInfoDTO.address)) {
                        alert(
                                "Wrong address length. Check token address Again."
                        );
                        return;
                }

                dispatch(getAddressInfo(addrInfoDTO));
        };

        const saveToken = () => {
                if (!isProperAddress(addrInfoDTO.address)) {
                        alert(
                                "Wrong address length. Check token address Again."
                        );
                        return;
                }

                dispatch(saveCoinInfo(addrInfoDTO));

                document.getElementById("coinInput").value = "";
        };

        const modeSwitch = () => {
                if (tab === "Register") {
                        setTab("List");
                } else if (tab === "List") {
                        setTab("Register");
                }
        };

        const chainList = networkList.map((v, k) => {
                return (
                        <option key={k} value={v}>
                                {v}
                        </option>
                );
        });

        return (
                <Wrapper>
                        <div
                                style={{
                                        marginBottom: "4%",
                                        display: "flex",
                                        justifyContent: "space-around",
                                }}
                        >
                                <MyButton onClick={modeSwitch}>
                                        mode switch
                                </MyButton>
                                <span>{tab}</span>
                        </div>
                        {tab === "Register" ? (
                                <>
                                        <div style={{ marginBottom: "3%" }}>
                                                <CoinSelectBox
                                                        style={{
                                                                marginRight:
                                                                        "5%",
                                                        }}
                                                >
                                                        <select
                                                                onChange={
                                                                        chooseChain
                                                                }
                                                        >
                                                                {chainList}
                                                        </select>
                                                </CoinSelectBox>
                                                <span>
                                                        <span
                                                                style={{
                                                                        marginRight:
                                                                                "2%",
                                                                        fontSize: "16px",
                                                                }}
                                                        >
                                                                Address{" "}
                                                        </span>
                                                        <CoinInput
                                                                placeholder="input token address"
                                                                onChange={setCA}
                                                                id="coinInput"
                                                        />
                                                        <span>
                                                                <MyButton
                                                                        onClick={
                                                                                getTokenData
                                                                        }
                                                                >
                                                                        check
                                                                </MyButton>
                                                        </span>
                                                </span>
                                        </div>
                                        <TokenInfo>
                                                {addrInfoDTO.tokenInfo ===
                                                null ? (
                                                        <div
                                                                style={{
                                                                        width: "50%",

                                                                        textAlign: "center",
                                                                }}
                                                        >
                                                                {" "}
                                                                Check address to
                                                                see if it is
                                                                token...{" "}
                                                        </div>
                                                ) : addrInfoDTO.tokenInfo
                                                          .isToken === false ? (
                                                        <div
                                                                style={{
                                                                        width: "50%",
                                                                        color: "red",
                                                                }}
                                                        >
                                                                This address is
                                                                not for the
                                                                token. Please
                                                                check address
                                                                and network
                                                                again.
                                                        </div>
                                                ) : (
                                                        <CoinInfo>
                                                                <div>
                                                                        {" "}
                                                                        name :{" "}
                                                                        {
                                                                                addrInfoDTO
                                                                                        .tokenInfo
                                                                                        .name
                                                                        }
                                                                </div>
                                                                <div>
                                                                        {" "}
                                                                        symbol :{" "}
                                                                        {
                                                                                addrInfoDTO
                                                                                        .tokenInfo
                                                                                        .symbol
                                                                        }
                                                                </div>
                                                                <div
                                                                        style={{
                                                                                marginBottom:
                                                                                        "3vh",
                                                                        }}
                                                                >
                                                                        {" "}
                                                                        decimals:{" "}
                                                                        {
                                                                                addrInfoDTO
                                                                                        .tokenInfo
                                                                                        .decimals
                                                                        }
                                                                </div>
                                                                <MyButton
                                                                        onClick={
                                                                                saveToken
                                                                        }
                                                                >
                                                                        Register
                                                                </MyButton>
                                                        </CoinInfo>
                                                )}
                                        </TokenInfo>
                                </>
                        ) : (
                                <div>코인 리스트...</div>
                        )}
                </Wrapper>
        );
};

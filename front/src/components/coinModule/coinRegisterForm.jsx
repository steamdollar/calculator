import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getAddressInfo, setAddress, setChain } from "./coinRegisterSlice";
import { networkList } from "../../util/network";

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

export const CoinRegisterForm = () => {
        const dispatch = useDispatch();
        const addrInfoDTO = useSelector((state) => state.addressInfo);

        const setCA = (e) => {
                dispatch(setAddress(e.target.value));
        };

        const chooseChain = (e) => {
                dispatch(setChain(e.target.value));
        };

        const getTokenData = () => {
                dispatch(getAddressInfo(addrInfoDTO));
        };

        const asd = () => {
                console.log(addrInfoDTO.tokenInfo);
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
                        <div style={{ marginBottom: "3%" }}>
                                <CoinSelectBox style={{ marginRight: "5%" }}>
                                        <select onChange={chooseChain}>
                                                {chainList}
                                        </select>
                                </CoinSelectBox>
                                <span>
                                        <span
                                                style={{
                                                        marginRight: "2%",
                                                        fontSize: "16px",
                                                }}
                                        >
                                                Address{" "}
                                        </span>
                                        <CoinInput
                                                placeholder="input token address"
                                                onChange={setCA}
                                        />
                                        <span>
                                                <MyButton
                                                        onClick={getTokenData}
                                                >
                                                        check
                                                </MyButton>
                                        </span>
                                </span>
                        </div>
                        <TokenInfo>
                                {addrInfoDTO.tokenInfo === null ? (
                                        <div
                                                style={{
                                                        width: "50%",
                                                        border: "1px solid",
                                                }}
                                        >
                                                {" "}
                                                check address to see its token{" "}
                                        </div>
                                ) : addrInfoDTO.tokenInfo.isToken === false ? (
                                        <div
                                                style={{
                                                        width: "50%",
                                                        color: "red",
                                                }}
                                        >
                                                This address is not for the
                                                token. Please check address and
                                                network again.
                                        </div>
                                ) : (
                                        <div
                                                style={{
                                                        width: "50%",
                                                        border: "1px solid",
                                                        textAlign: "center",
                                                        color: "green",
                                                }}
                                        >
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
                                                <div>
                                                        {" "}
                                                        decimals:{" "}
                                                        {
                                                                addrInfoDTO
                                                                        .tokenInfo
                                                                        .decimals
                                                        }
                                                </div>
                                        </div>
                                )}
                        </TokenInfo>
                </Wrapper>
        );
};

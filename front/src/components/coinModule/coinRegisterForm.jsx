import React from "react";
import styled from "styled-components";

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
        height: 150%;
`;

const CoinInput = styled.input`
        width: 60%;
        border: none;
        border-bottom: 1px solid gray;
        padding: 0.5%;

        text-align: center;
        font-size: 16px;
`;

const TokenInfo = styled.div`
        margin: 5% 0 0 0;
`;

export const CoinRegisterForm = () => {
        return (
                <Wrapper>
                        <div style={{ marginBottom: "3%" }}>
                                <CoinSelectBox style={{ marginRight: "6%" }}>
                                        <select>
                                                <option value="ethereum">
                                                        Ethereum
                                                </option>
                                                <option value="Optimism">
                                                        Optimism
                                                </option>
                                                <option value="Arbitrum One">
                                                        Arbitrum One
                                                </option>
                                                <option value="matic">
                                                        matic
                                                </option>
                                        </select>
                                </CoinSelectBox>
                                <span>
                                        <span style={{ marginRight: "3%" }}>
                                                Address{" "}
                                        </span>
                                        <CoinInput placeholder="input token address" />
                                </span>
                        </div>
                        <TokenInfo>여기 코인 정보가 표시됨</TokenInfo>
                </Wrapper>
        );
};

import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { CoinList } from "./coinListForm";
import { ChainList } from "./ChainList";
import { MyButton } from "../common/commons";
import { TokenInfoInput } from "./TokenInfoInput";
import { CoinDetail } from "./CoinDetail";

const ModeToggle = styled.div`
        margin-bottom: 4%;
        display: flex;
        justify-content: space-around;
`;

const TokenInfo = styled.div`
        margin: 0 auto;

        > div {
                margin: 0 auto;
        }
`;

const CheckIfToken = styled.div`
        width: 50%;
        text-align: center;
        font-size: 20px;
        margin-top: 3% !important;
`;

const IsNotToken = styled.div`
        width: 50%;
        color: red;
`;

export const CoinRegisterForm = () => {
        const addrInfoDTO = useSelector((state) => state.addressInfo);
        const [tab, setTab] = useState("Register");

        const modeSwitch = () => {
                if (tab === "Register") {
                        setTab("List");
                } else if (tab === "List") {
                        setTab("Register");
                }
        };

        return (
                <>
                        <ModeToggle>
                                <MyButton onClick={modeSwitch}>
                                        mode switch
                                </MyButton>
                                <span>{tab}</span>
                        </ModeToggle>

                        <ChainList />

                        {tab === "Register" ? (
                                <>
                                        <TokenInfoInput />
                                        <TokenInfo>
                                                {addrInfoDTO.tokenInfo ===
                                                null ? (
                                                        <CheckIfToken>
                                                                Check address to
                                                                see if it is
                                                                token...
                                                        </CheckIfToken>
                                                ) : addrInfoDTO.tokenInfo
                                                          .isToken === false ? (
                                                        <IsNotToken>
                                                                This address is
                                                                not for the
                                                                token. Please
                                                                check address
                                                                and network
                                                                again.
                                                        </IsNotToken>
                                                ) : (
                                                        <CoinDetail />
                                                )}
                                        </TokenInfo>
                                </>
                        ) : (
                                <div>
                                        <CoinList />
                                </div>
                        )}
                </>
        );
};

import { useEffect } from "react";
import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { WalletList } from "../walletModule/walletListModule/walletList";
import { setAddress, getBalanceInfo } from "./balanceSlice";

const WalletPageWrap = styled.div`
        margin: 0 auto;
`;

const ChooseWallet = styled.div`
        margin: 0 auto;
        text-align: center;
        font-size: 24px;
        margin-bottom: 3%;
`;

export const BalanceInfo = () => {
        const dispatch = useDispatch();
        const balanceDTO = useSelector((state) => state.balanceGetter);
        const { walletId } = useParams();

        useEffect(() => {
                dispatch(setAddress(walletId));
        }, []);

        const getBalance = (network) => {
                dispatch(getBalanceInfo({ address: walletId, network }));
        };

        return (
                <WalletPageWrap>
                        {walletId === ":walletId" ? (
                                <div>
                                        <ChooseWallet>
                                                Select Wallet to see detail
                                        </ChooseWallet>
                                        <WalletList />
                                </div>
                        ) : (
                                <div>
                                        <span> wallet id : {walletId}</span>
                                        <div>
                                                <span
                                                        onClick={(e) =>
                                                                getBalance(
                                                                        e.target
                                                                                .innerHTML
                                                                )
                                                        }
                                                >
                                                        Ethereum
                                                </span>
                                                <span
                                                        onClick={(e) =>
                                                                getBalance(
                                                                        e.target
                                                                                .innerHTML
                                                                )
                                                        }
                                                >
                                                        Optimism
                                                </span>
                                                <span
                                                        onClick={(e) =>
                                                                getBalance(
                                                                        e.target
                                                                                .innerHTML
                                                                )
                                                        }
                                                >
                                                        Arbitrum One
                                                </span>
                                                <span
                                                        onClick={(e) =>
                                                                getBalance(
                                                                        e.target
                                                                                .innerHTML
                                                                )
                                                        }
                                                >
                                                        Matic
                                                </span>
                                        </div>
                                </div>
                        )}
                </WalletPageWrap>
        );
};

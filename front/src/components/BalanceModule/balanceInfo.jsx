import { useEffect, useState } from "react";
import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { networkList } from "../../util/network";
import { WalletList } from "../walletModule/walletListModule/walletList";
import { setAddress, getBalanceInfo } from "./balanceSlice";
import PieChart from "./Graph";

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
        const balanceDTO = useSelector((state) => state.balanceGetter.balances);
        const { walletId } = useParams();

        useEffect(() => {
                dispatch(setAddress(walletId));
        }, [dispatch]);

        const getBalance = (network) => {
                dispatch(getBalanceInfo({ address: walletId, network }));
        };

        const qwe = () => {
                console.log(
                        balanceDTO.filter((data) => data.network === "Ethereum")
                );
        };

        const balanceCard = networkList.map((v, k) => {
                return (
                        <div key={k}>
                                <span
                                        onClick={(e) => {
                                                getBalance(e.target.innerHTML);
                                        }}
                                >
                                        {v}
                                </span>
                                <span>
                                        {balanceDTO.findIndex(
                                                (item) => item.network === v
                                        ) === -1 ? (
                                                <div> click to get Info</div>
                                        ) : (
                                                <>
                                                        <PieChart
                                                                balanceData={balanceDTO.filter(
                                                                        (
                                                                                dataset
                                                                        ) =>
                                                                                dataset.network ===
                                                                                v
                                                                )}
                                                                key={k}
                                                        />
                                                        <span>asdad</span>
                                                </>
                                        )}
                                </span>
                        </div>
                );
        });

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
                                        <div>{balanceCard}</div>
                                        <div>
                                                <button onClick={qwe} />
                                        </div>
                                </div>
                        )}
                </WalletPageWrap>
        );
};

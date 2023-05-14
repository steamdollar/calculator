import { useEffect, useState } from "react";
import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { networkList } from "../../util/network";
import { WalletList } from "../walletModule/walletListModule/walletList";
import AssetInfoForcard from "./AssetInfo";
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

const WalletId = styled.div`
        margin-bottom: 5%;
        text-align: center;
        font-size: 24px;
`;

const CardsContainer = styled.div`
        border: 1px solid black;
`;

const ChartWrapper = styled.div`
        min-height: 250px;
        min-width: 250px;
        padding: 0 0 0 5%;
`;

export const BalanceInfo = () => {
        const dispatch = useDispatch();
        const balanceDTO = useSelector((state) => state.balanceGetter.balances);
        const { walletId } = useParams();

        const location = useLocation();
        const queryString = new URLSearchParams(location.search);
        const walletName = queryString.get("name");

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
                        <div
                                key={k}
                                onClick={() => {
                                        getBalance(v);
                                }}
                                style={{
                                        border: "1px solid black",
                                        padding: "2.5% 20% 2.5% 20%",
                                }}
                        >
                                <span
                                        style={{
                                                fontSize: "24px",
                                                marginLeft: "1%",
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
                                                <div
                                                        style={{
                                                                display: "flex",
                                                                justifyContent:
                                                                        "space-between",
                                                        }}
                                                >
                                                        <ChartWrapper>
                                                                <PieChart
                                                                        key={k}
                                                                        balanceData={balanceDTO.filter(
                                                                                (
                                                                                        dataset
                                                                                ) =>
                                                                                        dataset.network ===
                                                                                        v
                                                                        )}
                                                                />
                                                        </ChartWrapper>

                                                        <AssetInfoForcard
                                                                assetData={balanceDTO.filter(
                                                                        (
                                                                                dataset
                                                                        ) =>
                                                                                dataset.network ===
                                                                                v
                                                                )}
                                                        />
                                                </div>
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
                                        <WalletId>
                                                Wallet :
                                                {`${walletId} (${walletName})`}
                                        </WalletId>
                                        <CardsContainer>
                                                {balanceCard}
                                        </CardsContainer>
                                        <div>
                                                <button onClick={qwe} />
                                        </div>
                                </div>
                        )}
                </WalletPageWrap>
        );
};

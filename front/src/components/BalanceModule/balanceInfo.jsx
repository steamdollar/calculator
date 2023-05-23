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
        border: 1px solid red;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
`;

const ChartWrapper = styled.div`
        min-height: 225px;
        min-width: 225px;
        max-width: 225px;
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
                                        border: "1px solid green",
                                        padding: "2.5% 2.5% 2.5% 2.5%",
                                        width: "40%",
                                }}
                        >
                                <div
                                        style={{
                                                fontSize: "24px",
                                                marginLeft: "1%",
                                        }}
                                >
                                        {v}
                                </div>
                                <div>
                                        {balanceDTO.findIndex(
                                                (item) => item.network === v
                                        ) === -1 ? (
                                                <div> click to get Info</div>
                                        ) : (
                                                <div
                                                        style={{
                                                                display: "flex",
                                                                justifyContent:
                                                                        "space-evenly",
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
                                </div>
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

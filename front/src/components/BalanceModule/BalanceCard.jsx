import { useEffect, useState } from "react";
import { React } from "react";

import { networkList } from "../../util/network";
import { useDispatch, useSelector } from "react-redux";
import PieChart from "./Graph";
import AssetInfoForcard from "./AssetInfo";
import styled from "styled-components";
import { getBalanceInfo } from "./balanceSlice";
import { firstLetterUpper } from "../../util/checkValue";
import { useParams } from "react-router-dom";

const ChartWrapper = styled.div`
        min-height: 225px;
        min-width: 225px;
        max-width: 225px;
`;

const Card = styled.div`
        border: 0.5px solid green;
        padding: 2.5%;
        width: 44.8%;
        max-width: 600px;
`;

const Network = styled.div`
        font-size: 24px;
        margin-left: 1%;
`;

export const BalanceCard = () => {
        const dispatch = useDispatch();
        const { walletId } = useParams();

        const balanceDTO = useSelector((state) => state.balanceGetter.balances);

        const getBalance = (network) => {
                dispatch(getBalanceInfo({ address: walletId, network }));
        };

        const balanceCard = networkList.map((v, k) => {
                return (
                        <Card
                                key={k}
                                onClick={() => {
                                        getBalance(v);
                                }}
                        >
                                <Network>{firstLetterUpper(v)}</Network>
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
                        </Card>
                );
        });

        return <>{balanceCard}</>;
};

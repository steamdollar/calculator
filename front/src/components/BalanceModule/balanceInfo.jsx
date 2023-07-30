import { useEffect } from "react";
import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { WalletList } from "../walletModule/walletListModule/walletList";
import { setAddress } from "./balanceSlice";
import { BalanceCard } from "./BalanceCard";

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
        font-size: 20px;
`;

const CardsContainer = styled.div`
        display: flex;
        flex-wrap: wrap;
        max-width: 1200px;
        margin: 0 auto;
`;

export const BalanceInfo = () => {
        const dispatch = useDispatch();
        const balanceDTO = useSelector((state) => state.balanceGetter.balances);
        const { walletId } = useParams();

        const location = useLocation();
        const queryString = new URLSearchParams(location.search);
        const walletName = queryString.get("name");

        const total = balanceDTO.reduce((acc1, network) => {
                const networkTotal = network.balances.reduce((acc2, token) => {
                        return acc2 + parseFloat(token.balance) * token.price;
                }, 0);
                return acc1 + networkTotal;
        }, 0);

        useEffect(() => {
                dispatch(setAddress(walletId));
        }, [dispatch]);

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
                                                {` ${walletId} (${walletName})`}
                                        </WalletId>
                                        <div>
                                                {"Total balance : $" +
                                                        total.toFixed(2)}
                                        </div>
                                        <CardsContainer>
                                                <BalanceCard />
                                        </CardsContainer>
                                </div>
                        )}
                </WalletPageWrap>
        );
};

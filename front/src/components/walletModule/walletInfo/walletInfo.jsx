import { React } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { WalletList } from "../walletListModule/walletList";

const WalletPageWrap = styled.div`
        margin: 0 auto;
`;

const ChooseWallet = styled.div`
        margin: 0 auto;
        text-align: center;
        font-size: 24px;
        margin-bottom: 3%;
`;

export const WalletInfo = () => {
        const { walletId } = useParams();

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
                                <span> wallet id : {walletId}</span>
                        )}
                </WalletPageWrap>
        );
};

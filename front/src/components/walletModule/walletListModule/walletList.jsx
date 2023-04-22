import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { getWalletInfo } from "./walletListSlice";
import { useNavigate } from "react-router-dom";

const WalletTableWrap = styled.div`
        border: 1px solid black;
`;

const WalletTable = styled.div`
        border: 1px solid black;
        display: flex !important;
        justify-content: space-evenly !important;
        padding: 3%;
`;

export const WalletList = () => {
        const dispatch = useDispatch();
        const navigate = useNavigate();

        const walletList = useSelector((state) => state.walletList.data);
        const walletDTOstatus = useSelector(
                (state) => state.walletRegister.status
        );

        const moveToWalletpage = (addr) => {
                navigate(`/wallet/${addr}`);
        };

        useEffect(() => {
                dispatch(getWalletInfo());
        }, [walletDTOstatus]);

        const showWalletList = walletList.map((v, k) => {
                return (
                        <WalletTable key={k}>
                                <span
                                        onClick={() =>
                                                moveToWalletpage(v.address)
                                        }
                                >
                                        {v.address}
                                </span>
                                <span>{v.name}</span>
                                <span>{v.purpose}</span>
                        </WalletTable>
                );
        });

        return (
                <WalletTableWrap>
                        <div>{showWalletList}</div>
                </WalletTableWrap>
        );
};

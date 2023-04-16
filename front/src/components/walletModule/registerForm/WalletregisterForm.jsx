import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
        inputAddress,
        inputAffiliation,
        inputPurpose,
        saveWalletInfo,
} from "./walletSlice";

const Wrapper = styled.div`
        border: 1px solid black;
        margin: 0 auto;
        padding: 3%;
`;

const SectionName = styled.div`
        display: inline-block;
        margin: 1% auto;
        padding: 0 0 0 1.5%;
        font-size: 24px;
`;

const SubmitForm = styled.div`
        border: 1px solid black;
        margin: 0 auto;
        padding: 0 1%;

        > div {
                display: flex;
                justify-content: center;
                padding: 0 1%;
                margin: 3% 0;
                font-size: 20px;

                > span {
                        margin: auto 3%;
                        width: 10%;
                        text-align: center;
                }

                > input {
                        border: none;
                        border-bottom: 1px solid gray;
                        padding: 0.5%;
                        width: 50%;
                        text-align: center;
                        font-size: 16px;
                }
        }

        > button {
                display: block;
                left: 50%;
                top: 50%;
        }
`;

export const WalletRegisterForm = () => {
        const dispatch = useDispatch();
        const walletDTO = useSelector((state) => state.walletRegister);

        const handleAddress = (e) => {
                dispatch(inputAddress(e.target.value));
        };

        const handleAffiliation = (e) => {
                dispatch(inputAffiliation(e.target.value));
        };

        const handlePurpose = (e) => {
                dispatch(inputPurpose(e.target.value));
        };

        const saveInfo = async (walletDTO) => {
                dispatch(saveWalletInfo(walletDTO));
        };

        return (
                <Wrapper>
                        <SectionName> Wallet Register </SectionName>
                        <SubmitForm>
                                <div style={{ marginTop: "5%" }}>
                                        <span> address </span>
                                        <input
                                                placeholder="input address"
                                                value={walletDTO.address}
                                                onChange={handleAddress}
                                        />
                                </div>
                                <div>
                                        <span style={{ fontSize: "19px" }}>
                                                affiliation
                                        </span>
                                        <input
                                                placeholder="input affiliation"
                                                value={walletDTO.affiliation}
                                                onChange={handleAffiliation}
                                        />
                                </div>
                                <div>
                                        <span> purpose </span>
                                        <input
                                                placeholder="input purpose"
                                                value={walletDTO.purpose}
                                                onChange={handlePurpose}
                                        />
                                </div>
                                <div>
                                        <button
                                                onClick={() =>
                                                        saveInfo(walletDTO)
                                                }
                                        >
                                                save
                                        </button>
                                </div>
                        </SubmitForm>
                </Wrapper>
        );
};

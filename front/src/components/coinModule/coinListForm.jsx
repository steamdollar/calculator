import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div`
        margin: 0 auto;
        border: 1px solid black;
`;

export const CoinList = () => {
        const dispatch = useDispatch();
        const chain = useSelector((state) => state.addressInfo.chain);

        const getCoin = () => {
                console.log(chain);
        };

        return (
                <Wrapper>
                        <button onClick={getCoin}>load</button>
                </Wrapper>
        );
};

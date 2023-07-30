import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ChainList } from "./ChainList";

const Wrapper = styled.div`
        width: 75%;
        margin: 0 auto;
        border: 1px solid black;
`;

export const CoinList = () => {
        const dispatch = useDispatch();

        return (
                <Wrapper>
                        <ChainList />
                </Wrapper>
        );
};

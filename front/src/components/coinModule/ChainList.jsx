import { useDispatch } from "react-redux";
import { networkList } from "../../util/network";
import { setChain } from "./coinRegisterSlice";
import styled from "styled-components";

const Wrapper = styled.span`
        display: inline;
`;

const ChainSelectBox = styled.select`
        width: 18%;
        text-align: center;
        font-size: 16px;
        min-height: 24px;
        max-height: 24px;
`;

export const ChainList = () => {
        const dispatch = useDispatch();
        const chooseChain = (e) => {
                dispatch(setChain(e.target.value));
        };

        const selector = networkList.map((v, k) => {
                return (
                        <option key={k} value={v}>
                                {v}
                        </option>
                );
        });

        return (
                <Wrapper>
                        <ChainSelectBox onChange={chooseChain}>
                                {selector}
                        </ChainSelectBox>
                </Wrapper>
        );
};

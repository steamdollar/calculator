import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MyButton } from "../common/commons";
import { getCoinList } from "./getCoinListSlice";

export const CoinList = () => {
        const dispatch = useDispatch();
        const chain = useSelector((state) => state.addressInfo.chain);
        const tokenList = useSelector((state) => state.getTokenList.coinList);

        const getCoin = (network) => {
                // 객체 형태로 줘야 async function에서 인식
                dispatch(getCoinList({ network: chain }));
        };

        const tokenTable = tokenList.filter((v) => v.chain === chain);
        // const list = tokenTable.coinList.map((v, k) => {
        //         return (
        //                 <div key={k}>
        //                         <span>{k}</span>
        //                         <span>{v.symbol}</span>
        //                         <span>{v.ca}</span>
        //                 </div>
        //         );
        // });

        useEffect(() => {
                // console.log(tokenList);
                console.log(tokenTable);
        }, tokenList);

        return (
                <>
                        <MyButton
                                onClick={getCoin}
                                style={{ marginLeft: "5%" }}
                        >
                                load
                        </MyButton>
                        <div></div>
                </>
        );
};

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
        selectPosition,
        inputLoss,
        selectEntry,
        selectSl,
        showLossDiff,
        showLeverage,
        selectTP,
        showProfitDiff,
        showSR,
        selectTicker,
        saveTradeInfo,
} from "./calculatorSlice";
import styled from "styled-components";
import { calculateLossDiff, calculateProfitDiff } from "../../../util/formula";
import { isProperPrice } from "../../../util/checkValue";

const CalculateModule = styled.div`
        margin: "0 auto";
        padding: "5px 10px";
        border: 1px solid palevioletred;
        text-align: center;
`;

const FieldTable = styled.div`
        display: flex;
        justify-content: space-between;
        border: 1px solid black;
`;

const FieldDetail = styled.div`
        min-width: 9%;
        border: 1px solid red;
        font-size: 20px;
        > div {
                margin-bottom: 8%;
                > input {
                        width: 80px;
                }
        }
`;

const SelectPosition = styled.select`
        display: inline;
        width: 100px;
`;

export function Calculator() {
        const dispatch = useDispatch();
        const fullValue = useSelector((state) => state.calculator.value);

        const position = fullValue.position;
        const loss = fullValue.loss;
        const entry = fullValue.entry;
        const stopLoss = fullValue.stopLoss;
        const lossDiff = fullValue.lossDiff;
        const leverage = fullValue.leverage;
        const takeProfit = fullValue.takeProfit;
        const profitDiff = fullValue.profitDiff;
        const sr = fullValue.sr;
        const ticker = fullValue.ticker;

        useEffect(() => {
                dispatch(
                        showLossDiff(
                                calculateLossDiff(
                                        position,
                                        loss,
                                        entry,
                                        stopLoss
                                )[0]
                        )
                );
                dispatch(
                        showLeverage(
                                calculateLossDiff(
                                        position,
                                        loss,
                                        entry,
                                        stopLoss
                                )[1]
                        )
                );
                dispatch(
                        showProfitDiff(
                                calculateProfitDiff(
                                        position,
                                        entry,
                                        takeProfit,
                                        lossDiff
                                )[0]
                        )
                );
                dispatch(
                        showSR(
                                calculateProfitDiff(
                                        position,
                                        entry,
                                        takeProfit,
                                        lossDiff
                                )[1]
                        )
                );
        }, [position, loss, entry, stopLoss, takeProfit]);

        const handleLoss = (e) => {
                dispatch(inputLoss(e.target.value));
        };

        const handleEntry = (e) => {
                dispatch(selectEntry(e.target.value));
        };

        const handleSl = (e) => {
                dispatch(selectSl(e.target.value));
        };

        const handleTP = (e) => {
                dispatch(selectTP(e.target.value));
        };

        const handleTicker = (e) => {
                dispatch(selectTicker(e.target.value));
        };

        const saveInfo = async (info) => {
                const {
                        position,
                        loss,
                        entry,
                        stopLoss,
                        lossDiff,
                        leverage,
                        takeProfit,
                        profitDiff,
                        sr,
                        ticker,
                } = info;

                if (
                        position === "n/a" ||
                        loss <= 0 ||
                        entry <= 0 ||
                        stopLoss <= 0 ||
                        lossDiff <= 0 ||
                        leverage <= 0 ||
                        takeProfit <= 0 ||
                        profitDiff <= 0 ||
                        sr <= 0 ||
                        ticker === ""
                ) {
                        alert("input all information");
                        return;
                }

                let posi = 0;

                if (position === "long") {
                        posi = true;
                } else {
                        posi = false;
                }

                const tableSaved = {
                        position: posi,
                        tolerance: loss,
                        entry,
                        sl: stopLoss,
                        tp: takeProfit,
                        ticker,
                };

                console.log(tableSaved);
                dispatch(saveTradeInfo(tableSaved));
        };

        return (
                <CalculateModule>
                        <FieldTable>
                                <FieldDetail>
                                        <div> position </div>
                                        <div>
                                                <SelectPosition
                                                        onChange={(e) =>
                                                                dispatch(
                                                                        selectPosition(
                                                                                e
                                                                                        .target
                                                                                        .value
                                                                        )
                                                                )
                                                        }
                                                        value={position}
                                                        style={{
                                                                marginBottom:
                                                                        "8%",
                                                        }}
                                                >
                                                        <option value="n/a">
                                                                choose
                                                                long/short
                                                        </option>
                                                        <option value="long">
                                                                Long
                                                        </option>
                                                        <option value="short">
                                                                Short
                                                        </option>
                                                </SelectPosition>
                                                <div>
                                                        {position === "n/a" ? (
                                                                <span
                                                                        style={{
                                                                                color: "red",
                                                                        }}
                                                                >
                                                                        {" "}
                                                                        choose
                                                                        position{" "}
                                                                </span>
                                                        ) : (
                                                                <span
                                                                        style={{
                                                                                color: "green",
                                                                        }}
                                                                >
                                                                        good
                                                                </span>
                                                        )}
                                                </div>
                                        </div>
                                </FieldDetail>
                                <FieldDetail>
                                        <div> tolerance (%)</div>
                                        <div>
                                                <input
                                                        onChange={handleLoss}
                                                        placeholder="input loss tolerance"
                                                        value={loss}
                                                />
                                        </div>
                                        <div>
                                                {isProperPrice(loss) ? (
                                                        <span
                                                                style={{
                                                                        color: "green",
                                                                }}
                                                        >
                                                                {" "}
                                                                good{" "}
                                                        </span>
                                                ) : (
                                                        <span
                                                                style={{
                                                                        color: "red",
                                                                }}
                                                        >
                                                                error!!
                                                        </span>
                                                )}
                                        </div>
                                </FieldDetail>
                                <FieldDetail>
                                        <div> entry ($)</div>
                                        <div>
                                                <input
                                                        placeholder="entry price"
                                                        onChange={handleEntry}
                                                        value={entry}
                                                />
                                        </div>
                                        <div>
                                                {isProperPrice(entry) ? (
                                                        <span
                                                                style={{
                                                                        color: "green",
                                                                }}
                                                        >
                                                                {" "}
                                                                good{" "}
                                                        </span>
                                                ) : (
                                                        <span
                                                                style={{
                                                                        color: "red",
                                                                }}
                                                        >
                                                                error!!
                                                        </span>
                                                )}
                                        </div>
                                </FieldDetail>
                                <FieldDetail>
                                        <div> SL ($)</div>
                                        <div>
                                                <input
                                                        placeholder="input stop loss"
                                                        onChange={handleSl}
                                                        value={stopLoss}
                                                />
                                        </div>
                                        <div>
                                                {isProperPrice(stopLoss) ? (
                                                        <span
                                                                style={{
                                                                        color: "green",
                                                                }}
                                                        >
                                                                {" "}
                                                                good{" "}
                                                        </span>
                                                ) : (
                                                        <span
                                                                style={{
                                                                        color: "red",
                                                                }}
                                                        >
                                                                error!!
                                                        </span>
                                                )}
                                        </div>
                                </FieldDetail>
                                <FieldDetail>
                                        <div> loss Diff (%)</div>
                                        <div>{lossDiff}</div>
                                </FieldDetail>
                                <FieldDetail>
                                        <div> leverage </div>
                                        <div> {leverage}</div>
                                </FieldDetail>
                                <FieldDetail>
                                        <div> TP ($) </div>
                                        <div>
                                                <input
                                                        placeholder="input TP"
                                                        onChange={handleTP}
                                                        value={takeProfit}
                                                />
                                        </div>
                                        <div>
                                                {isProperPrice(takeProfit) ? (
                                                        <span
                                                                style={{
                                                                        color: "green",
                                                                }}
                                                        >
                                                                {" "}
                                                                good{" "}
                                                        </span>
                                                ) : (
                                                        <span
                                                                style={{
                                                                        color: "red",
                                                                }}
                                                        >
                                                                error!!
                                                        </span>
                                                )}
                                        </div>
                                </FieldDetail>
                                <FieldDetail>
                                        <div> profitDiff (%)</div>
                                        <div> {profitDiff} </div>
                                </FieldDetail>
                                <FieldDetail>
                                        <div> s/r</div>
                                        <div> {sr} </div>
                                </FieldDetail>
                                <FieldDetail>
                                        <div> ticker </div>
                                        <div>
                                                <input
                                                        placeholder="input ticker"
                                                        onChange={handleTicker}
                                                        value={ticker}
                                                />
                                        </div>
                                        <div>
                                                {ticker ? (
                                                        <span
                                                                style={{
                                                                        color: "green",
                                                                }}
                                                        >
                                                                {" "}
                                                                good{" "}
                                                        </span>
                                                ) : (
                                                        <span
                                                                style={{
                                                                        color: "red",
                                                                }}
                                                        >
                                                                {" "}
                                                                input ticker{" "}
                                                        </span>
                                                )}
                                        </div>
                                </FieldDetail>
                        </FieldTable>
                        <button onClick={() => saveInfo(fullValue)}>
                                {" "}
                                save!{" "}
                        </button>
                </CalculateModule>
        );
}

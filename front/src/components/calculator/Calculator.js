import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPosition, inputLoss, selectEntry, selectSl, showLossDiff, showLeverage, selectTP, showProfitDiff, showSR, selectTicker } from "./calculatorSlice";
import styled from "styled-components"
import { calculateLossDiff, calculateProfitDiff, calculateSR } from "../formula";
import { isProperPrice } from "../../util/checkValue";

const CalculateModule = styled.div`
    margin : "0 auto";
    padding : "5px 10px";
    border : 1px solid palevioletred;
    text-align:center;
`

const FieldTable = styled.div`
    display:flex;
    justify-content : space-between;
    border : 1px solid black;
`

const FieldDetail = styled.div`
    min-width:7%;
    border : 1px solid red;
    > div {
        > input {
            width : 80px;
        }
    }
`

const SelectPosition = styled.select`
    display: inline ;
    width : 100px;
`


export function Calculator() {
    const dispatch = useDispatch()
    const fullValue = useSelector((state) => state.calculator)
    const position = useSelector((state)=> state.calculator.value.position)
    const loss = useSelector((state) => state.calculator.value.loss)
    const entry = useSelector((state)=> state.calculator.value.entry)
    const stopLoss = useSelector((state) => state.calculator.value.stopLoss)
    const lossDiff = useSelector((state) => state.calculator.value.lossDiff)
    const leverage = useSelector((state)=> state.calculator.value.leverage)
    const takeProfit = useSelector((state) => state.calculator.value.takeProfit)
    const profitDiff = useSelector((state) => state.calculator.value.profitDiff)
    const sr = useSelector((state) => state.calculator.value.sr)
    const ticker = useSelector((state) => state.calculator.value.ticker)


    useEffect(()=>{
        dispatch(showLossDiff(calculateLossDiff(position, loss, entry, stopLoss)[0]))
        dispatch(showLeverage(calculateLossDiff(position, loss, entry, stopLoss)[1]))
        dispatch(showProfitDiff(calculateProfitDiff(position, entry, takeProfit)))
        dispatch(showSR(calculateSR(profitDiff, lossDiff)))
    }, [position, loss, entry, stopLoss, takeProfit])

    const calculation = (fullValue) => {
        console.log(fullValue)
    }

    const handleLoss = (e) => {
        dispatch(inputLoss(e.target.value))
    }

    const handleEntry = (e) => {
        dispatch(selectEntry(e.target.value))
    }
    
    const handleSl = (e) => {
        dispatch(selectSl(e.target.value))
    }

    const handleTP = (e) => {
        dispatch(selectTP(e.target.value))
    }

    const handleTicker =(e) => {
        dispatch(selectTicker(e.target.value))
    }
    

    return (
        <CalculateModule>
            {/* column 명 */}
            <FieldTable>
                <FieldDetail> 
                    <div> position </div>
                    <div> 
                        <SelectPosition 
                            onChange={e => dispatch(selectPosition(e.target.value))}
                            value={position} 
                        >
                            <option>choose long/short</option>
                            <option value="long">Long</option>
                            <option value="short">Short</option>
                        </SelectPosition>

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
                        { isProperPrice(takeProfit) 
                            ? 
                                <span style={{color:"green"}}> good </span>
                            : 
                                <span style={{color:"red"}}>error!!</span>
                        }
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
                </FieldDetail>


            </FieldTable>
            <button onClick={() => calculation(fullValue)}> calculate! </button>
        </CalculateModule>
      )
}
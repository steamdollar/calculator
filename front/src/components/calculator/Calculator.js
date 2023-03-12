import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPosition, inputLoss, selectEntry, selectSl, showLossDiff, showLeverage } from "./calculatorSlice";
import styled from "styled-components"
import { calculateLossDiff } from "../formula";

export function Calculator() {
    const dispatch = useDispatch()
    const fullValue = useSelector((state) => state.calculator)
    const position = useSelector((state)=> state.calculator.value.position)
    const loss = useSelector((state) => state.calculator.value.loss)
    const entry = useSelector((state)=> state.calculator.value.entry)
    const stopLoss = useSelector((state) => state.calculator.value.stopLoss)
    const lossDiff = useSelector((state) => state.calculator.value.lossDiff)
    const leverage = useSelector((state)=> state.calculator.value.leverage)

    const NameTable = styled.div`
        display : flex;
        justify-content:space-evenly;
        margin : 0 10px 10px 10px;

        > span {
            display : inline-block;
            width: 100px !important;
        }
    `

    const SelectPosition = styled.select`
        display: inline ;
        width : 100px;
    `

    useEffect(()=>{
        dispatch(showLossDiff(calculateLossDiff(position, loss, entry, stopLoss)[0]))
        dispatch(showLeverage(calculateLossDiff(position, loss, entry, stopLoss)[1]))
    }, [position, loss, entry, stopLoss])

    const calculation = (fullValue) => {
        console.log(fullValue)
    }

    const handleLoss = (e) => {
        dispatch(inputLoss(e.target.value))
        e.target.focus()
    }

    const handleEntry = (e) => {
        dispatch(selectEntry(e.target.value))
    }
    
    const handleSl = (e) => {
        dispatch(selectSl(e.target.value))
    }
    

    return (
        <div style={{margin : "0 auto", padding : "5px 10px", border : "1px solid palevioletred"}}>
            {/* column 명 */}
            <NameTable>
                <span>position</span>
                <span> total loss tolerance </span>
                <span> entry </span>
                <span> SL </span>
                <span> stoploss: diff </span>
                <span> proper leverage </span>
                <span> TP </span>
                <span> takeProfit: diff</span>
                <span> S/R </span>
            </NameTable>
            {/* input boxes */}
            <div style={{display : "flex", justifyContent:"space-evenly", margin : "0 10px 10px 10px"}}>
                <SelectPosition 
                    onChange={e => dispatch(selectPosition(e.target.value))}
                    value={position} 
                >
                    <option>choose long/short</option>
                    <option value="long">Long</option>
                    <option value="short">Short</option>
                </SelectPosition>
                <span>
                    <input
                        style={{width: "100px"}}
                        onChange={handleLoss}
                        placeholder="input loss tolerance"
                        value={loss}
                    />
                </span>
                <span>
                    <input  
                    style={{width: "100px"}}                  
                        placeholder="entry price"
                        onChange={handleEntry} 
                        value={entry}
                    />
                </span>
                <span>
                    <input 
                    style={{width: "100px"}}
                        placeholder="input stop loss"
                        onChange={handleSl}
                        value={stopLoss}
                    />
                </span>
                <span style={{width: "100px", textAlign:"center"}}>
                    <span>
                        {lossDiff}
                    </span>
                </span>
                <span>
                    <span>{leverage}</span>
                </span>
                <span>
                    <span>TP</span>
                </span>
                <span>
                    <span>takeprofitdiff</span>
                </span>
                <span>
                    <span>S/R</span>
                </span>
            </div>
            <button onClick={() => calculation(fullValue)}> calculate! </button>
        </div>
      )
}
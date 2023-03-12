import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPosition, inputLoss, selectEntry, selectSl } from "./calculatorSlice";

export function Calculator() {
    const dispatch = useDispatch()
    const fullValue = useSelector((state) => state.calculator)
    const position = useSelector((state)=> state.calculator.value.position)
    const loss = useSelector((state) => state.calculator.value.loss)
    

    const aa = () => {
        console.log("============")
        console.log(fullValue.value)
        console.log(loss)
        console.log("============")
    }

    return (
        <div>
            <div style={{ display: "flex"}}>
                <span>position</span>
                <span> total loss tolerance </span>
                <span> entry </span>
                <span> SL </span>
                <span> stoploss: diff </span>
                <span> proper leverage </span>
                <span> TP </span>
                <span> takeProfit: diff</span>
                <span> S/R </span>
            </div>
          <div>
            <select 
                onChange={e => dispatch(selectPosition(e.target.value))} 
                style={{display : "inline", marginRight : "50px"}}  
            >
                <option>choose long/short</option>
                <option value="long">Long</option>
                <option value="short">Short</option>
            </select>
            <div>
                <input onChange={e => dispatch(inputLoss(e.target.value))}/>
            </div>
            <div>
                <input onChange={e => dispatch(selectEntry(e.target.value))}/>
            </div>
            <div>
                <input onChange={e => dispatch(selectSl(e.target.value))}/>
            </div>
            <div>
                <span>{}</span>
            </div>

          </div>
          <button onClick={aa}>click</button>
        </div>
      )
}
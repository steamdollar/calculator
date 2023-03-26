export const calculateLossDiff = (position, loss, entry, stoploss) => {
    
    if(position === "n/a" || loss === (null || "") || entry === (null || "") || stoploss === (null || "")) {
        return ["n/a", "n/a"]
    }
    let stopDiff = ""
    if(position === "long") {
        stopDiff = ((entry - stoploss)/entry) * 100
    } else {
        stopDiff = ((stoploss-entry)/entry) * 100
    } 
    
    const leverage = (loss/stopDiff).toFixed(2)
    return [stopDiff, leverage]
}

export const calculateProfitDiff = (position, entry, tp, lossDiff) => {
    if(position === "n/a" || entry === (null || "") || tp === (null || "")) {
        return ["n/a","n/a"]
    }
    let profitDiff = ""
    if (position === "long") {
        profitDiff = (((tp - entry) / entry) * 100)
    } else {
        profitDiff = ((((entry - tp) / entry)) * 100)
    }

    const SR = profitDiff/lossDiff
    return [profitDiff.toFixed(2), SR.toFixed(2)]
}

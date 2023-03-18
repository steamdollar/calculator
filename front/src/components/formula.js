export const calculateLossDiff = (position, loss, entry, stoploss) => {
    
    if(position === "n/a" || loss === (null || "") || entry === (null || "") || stoploss === (null || "")) {
        return ["n/a", "n/a"]
    }

    if(position === "long") {
        const stopDiff = ((entry - stoploss)/entry) * 100
        const leverage = (loss/stopDiff).toFixed(2)
        return [stopDiff, leverage]
    } else if (position === "short") {
        const stopDiff = ((stoploss-entry)/entry) * 100
        const leverage = (loss/stopDiff).toFixed(2)
        return [stopDiff, leverage]
    } else {
        return ["n/a", "n/a"]
    }
}

export const calculateProfitDiff = (position, entry, tp) => {
    if(position === "n/a" || entry === (null || "") || tp === (null || "")) {
        return "n/a"
    }

    if (position === "long") {
        return (((tp - entry) / entry) * 100)
    } else if (position === "short") {
        return ((((entry - tp) / entry)) * 100)
    }
}

export const calculateSR = (profitDiff, lossDiff) => {
    return (profitDiff/lossDiff).toFixed(2)
}
export const calculateLossDiff = (position, loss, entry, stoploss) => {
    if(position === "long") {
        const stopDiff = ((entry - stoploss)/entry) * 100
        const leverage = loss/stopDiff
        return [leverage, stopDiff]
    } else if (position === "short") {
        const stopDiff = ((stoploss-entry)/entry) * 100
        const leverage = loss/stopDiff
        return [leverage, stopDiff]
    } else {
        return ["n/a", "n/a"]
    }
}
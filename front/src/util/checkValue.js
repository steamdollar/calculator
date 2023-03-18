// check out calculator has proper value.
// It cannot have string value for entry or stoploss..

// for value that only need dot and numbers..
export const isProperPrice = (value) => {
    return (!/[^0-9.]/.test(value))
}
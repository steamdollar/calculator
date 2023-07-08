// check out calculator has proper value.
// It cannot have string value for entry or stoploss..

// for value that only need dot and numbers..
export const isProperPrice = (value) => {
        return !/[^0-9.]/.test(value);
};

export const isProperAddress = (address) => {
        if (address.length !== 42 || address.substr(0, 2) !== "0x") {
                return false;
        }
        return true;
};

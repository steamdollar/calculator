const a = "123.45a"

// for value that only need dot and numbers..
const isNumber = (value) => {
    console.log(!/[^0-9.]/.test(value))
}


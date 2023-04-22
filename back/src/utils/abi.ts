export const minErc20Abi = [
        {
                constant: true,
                inputs: [
                        {
                                name: "_owner",
                                type: "address",
                        },
                ],
                name: "balanceOf",
                outputs: [
                        {
                                name: "balance",
                                type: "uint256",
                        },
                ],
                type: "function",
        },

        {
                constant: true,
                inputs: [],
                name: "name",
                outputs: [
                        {
                                name: "",
                                type: "string",
                        },
                ],
                type: "function",
        },
        // get token symbol
        {
                constant: true,
                inputs: [],
                name: "symbol",
                outputs: [
                        {
                                name: "",
                                type: "string",
                        },
                ],
                type: "function",
        },
];

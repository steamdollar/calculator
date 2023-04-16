const ethers = require("ethers");
const dotenv = require("dotenv");
dotenv.config();

const provider = new ethers.InfuraProvider(
        "mainnet",
        process.env.INFURA_API_KEY
);

const decimals = 18;

// abi를 전부 가져오지말고 꼭 필요한 정보만을 가져다 넣는다.
const minimalErc20Abi = [
        {
                // constant : read only인지 여부
                constant: true,
                // 함수 인풋 파라미터. 여기선 address type의 _owner가 인수가 됨
                inputs: [
                        {
                                name: "_owner",
                                type: "address",
                        },
                ],
                // 호출할 함수 이름
                name: "balanceOf",
                // 함수의 output 파라미터를 묘사. 여기선 uint256 type balance가 나옴
                outputs: [
                        {
                                name: "balance",
                                type: "uint256",
                        },
                ],
                // type of abi element
                type: "function",
        },
        // get token name
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

// token 목록은 다음과 같이 db에서 가져왔다고 가정
const tokens = [
        {
                name: "stargate(STG)",
                contractAddress: "0xAf5191B0De278C7286d6C7CC6ab6BB8A73bA2Cd6",
        },
];

const getWalletTokenBalances = async (walletAddress) => {
        const balances = [];

        for (const token of tokens) {
                // Contract 매소드를 사용해 블록체인의 컨트랙트와 상호작용
                // param 1: addr (string) : ca address,
                // param 2 : abi(array) : application binary interface.
                // representation of contract's functions and respective i/o types
                // parma3 : skip
                const contract = new ethers.Contract(
                        token.contractAddress,
                        minimalErc20Abi,
                        provider
                );
                const balance = await contract.balanceOf(walletAddress);
                const name = await contract.name();
                const tokenSymbol = await contract.symbol();

                balances.push({
                        name: name,
                        balance: ethers.formatUnits(balance, decimals),
                        symbol: tokenSymbol,
                });
        }

        return balances;
};

(async () => {
        const walletAddress = "0x2BCD25D8D7bB17206d83cb359Fbacf16aBD2796C";
        const balances = await getWalletTokenBalances(walletAddress);
        console.log(balances);
})();

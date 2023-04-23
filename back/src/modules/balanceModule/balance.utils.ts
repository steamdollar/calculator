import { AlchemyProvider, ethers, InfuraProvider } from "ethers";
import { minErc20Abi } from "../../utils/abi";
import axios from "axios";

export class balance {
        name: string;
        balance: string;
        symbol: string;
        price?: any;
}

export class balanceResponse {
        status: number;
        balances: balance[];
}

export const makeTokenList = (tokenList) => {
        let tokensToReq = [];

        for (let i = 0; i < tokenList.length; i++) {
                tokensToReq.push(tokenList[i].dataValues.ca);
        }

        return tokensToReq;
};

export const selectService = (chain) => {
        if (
                chain === "mainnet" ||
                "arbitrum" ||
                "matic" ||
                "goerli" ||
                "optimism"
        ) {
                return "alchemy";
        } else {
                return "infura";
        }
};

// 함수 존나 구림.. 리팩토링 필요..
export const getTokenBalance = async (
        address: string,
        tokensToReq: string[],
        provider: AlchemyProvider | InfuraProvider,
        chain: string,
        fiat: string = "usd"
) => {
        let balances = [];

        const nativeTokenBalance = ethers.formatEther(
                await provider.getBalance(address)
        );

        const [network, nativeTokenName, nativeTokenSymbol, nativeTokenPrice] =
                await getNativeTokenInfo(chain, fiat);

        balances.push({
                name: nativeTokenName,
                symbol: nativeTokenSymbol,
                price: nativeTokenPrice,
                balance: nativeTokenBalance,
        });

        for (const ca of tokensToReq) {
                const contract = new ethers.Contract(ca, minErc20Abi, provider);

                const [balance, decimals] = await Promise.all([
                        contract.balanceOf(address),
                        contract.decimals(),
                ]);

                if (ethers.formatUnits(balance, decimals) !== "0.0") {
                        const [name, tokenSymbol, tokenPrice] =
                                await Promise.all([
                                        contract.name(),
                                        contract.symbol(),
                                        axios.get(
                                                `https://api.coingecko.com/api/v3/simple/token_price/${network}?contract_addresses=${ca}&vs_currencies=${fiat}`
                                        ),
                                ]);

                        balances.push({
                                name,
                                balance: ethers.formatUnits(balance, decimals),
                                symbol: tokenSymbol,
                                price: tokenPrice.data[ca.toLowerCase()][fiat],
                        });
                }
        }

        return balances;
};

export function makeBalanceResponse(balances: balance[]) {
        return {
                status: 0,
                balances,
        };
}

export const getNativeTokenInfo = async (
        chain: string,
        fiat: string = "usd"
) => {
        let ids = "ethereum";
        let nativeTokenSymbol = "eth";

        if (chain === "matic") {
                ids = "matic-network";
                nativeTokenSymbol = "matic";
        }

        const response = await axios.get(
                `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=${fiat}`
        );

        const nativeTokenName = Object.keys(response.data)[0];

        return [
                ids,
                nativeTokenName,
                nativeTokenSymbol,
                response.data[ids][fiat],
        ];
};

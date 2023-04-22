import { AlchemyProvider, ethers, InfuraProvider } from "ethers";
import { minErc20Abi } from "../../utils/abi";

export class balances {
        name: string;
        balance: string;
        symbol: string;
}

export class balanceResponse {
        status: number;
        balances: balances[];
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

export const getTokenBalance = async (
        address: string,
        tokensToReq: string[],
        provider: AlchemyProvider | InfuraProvider
) => {
        let balances = [];
        const decimals = 18;

        for (const ca of tokensToReq) {
                const contract = new ethers.Contract(ca, minErc20Abi, provider);

                const balance = await contract.balanceOf(address);

                if (ethers.formatUnits(balance, decimals) !== "0.0") {
                        const [name, tokenSymbol] = await Promise.all([
                                contract.name(),
                                contract.symbol(),
                        ]);

                        balances.push({
                                name: name,
                                balance: ethers.formatUnits(balance, decimals),
                                symbol: tokenSymbol,
                        });
                }
        }

        return balances;
};

export function makeBalanceResponse(balances: balances[]) {
        return {
                status: 0,
                balances,
        };
}

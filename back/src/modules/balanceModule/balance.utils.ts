import {
        AlchemyProvider,
        ethers,
        InfuraProvider,
        JsonRpcProvider,
} from "ethers";
import { minErc20Abi } from "../../utils/abi";
import axios from "axios";
import { Gecko } from "../../models/gecko.model";

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
        const forAlchemy = [
                "Ethereum",
                "Arbitrum One",
                "Matic",
                "goerli",
                "Optimism",
        ];
        if (forAlchemy.includes(chain)) {
                return "alchemy";
        } else {
                return "etc";
        }
};

export const getTokenBalance = async (
        address: string,
        tokensToReq: string[],
        provider: AlchemyProvider | InfuraProvider | JsonRpcProvider,
        chain: string,
        fiat: string = "usd"
) => {
        let balances = [];

        await getNativeTokenInfo(chain, address, provider, balances, fiat);

        const chainId = await getGeckoChainId(chain);

        await getTokenInfo(address, tokensToReq, provider, chainId, balances);

        return balances;
};

const getNativeTokenInfo = async (
        chain: string,
        address: string,
        provider: AlchemyProvider | InfuraProvider | JsonRpcProvider,
        balances: any,
        fiat: string = "usd"
) => {
        const nativeTokenBalance = ethers.formatEther(
                await provider.getBalance(address)
        );

        let ids = "ethereum";
        let nativeTokenSymbol = "ETH";
        //
        if (chain === "Matic") {
                ids = "matic-network";
                nativeTokenSymbol = "matic";
        } else if (chain === "avax") {
                ids = "avalanche-2";
                nativeTokenSymbol = "avax";
        } else if (chain === "bsc") {
                ids = "binancecoin";
                nativeTokenSymbol = "bnb";
        }
        const response = await axios.get(
                `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=${fiat}`
        );

        const nativeTokenbalance: balance = {
                name: Object.keys(response.data)[0],
                balance: nativeTokenBalance,
                symbol: nativeTokenSymbol,
                price: response.data[ids][fiat],
        };

        balances.push(nativeTokenbalance);
};

const getGeckoChainId = async (chain) => {
        // coingecko에서 사용하는 플랫폼 아이디 목록을 얻기 위해서는
        // https://api.coingecko.com/api/v3/asset_platforms
        // 이 url 참조
        const geckoChainId = await Gecko.findOne({
                where: {
                        chain: chain,
                },
                attributes: ["geckoChainId"],
        });

        return geckoChainId.dataValues.geckoChainId;
};

const getTokenInfo = async (
        address: string,
        tokensToReq: string[],
        provider: AlchemyProvider | InfuraProvider | JsonRpcProvider,
        chainId: string,
        balances: any,
        fiat: string = "usd"
) => {
        for (const ca of tokensToReq) {
                const contract = new ethers.Contract(ca, minErc20Abi, provider);
                const url = `https://api.coingecko.com/api/v3/simple/token_price/${chainId}?contract_addresses=${ca}&vs_currencies=${fiat}`;

                const [balance, decimals] = await Promise.all([
                        contract.balanceOf(address),
                        contract.decimals(),
                ]);

                if (ethers.formatUnits(balance, decimals) !== "0.0") {
                        const [name, tokenSymbol, tokenPrice] =
                                await Promise.all([
                                        contract.name(),
                                        contract.symbol(),
                                        axios.get(url),
                                ]);

                        balances.push({
                                name,
                                balance: ethers.formatUnits(balance, decimals),
                                symbol: tokenSymbol,
                                price: parseFloat(
                                        tokenPrice.data[ca.toLowerCase()][fiat]
                                ),
                        });
                }
        }
};

export function makeBalanceResponse(balances: balance[]) {
        return {
                status: 0,
                balances,
        };
}

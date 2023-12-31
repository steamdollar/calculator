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

export const selectService = (chain) => {
        const forAlchemy = ["Arbitrum One", "goerli", "Optimism"];
        const forInfura = ["Ethereum", "Matic"];
        if (forAlchemy.includes(chain)) {
                return "alchemy";
        } else if (forInfura.includes(chain)) {
                return "infura";
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
        const nativeTokenAmount = ethers.formatEther(
                await provider.getBalance(address)
        );

        const [ids, nativeTokenSymbol] = getNativeTokenSymbol(chain);

        // error 429.. 예전엔 안났는데 최근 policy가 변한 듯..
        const response = await axios.get(
                `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=${fiat}`
        );

        const nativeTokenbalance: balance = {
                name: Object.keys(response.data)[0],
                balance: nativeTokenAmount,
                symbol: nativeTokenSymbol,
                price: response.data[ids][fiat],
        };

        balances.push(nativeTokenbalance);
};

const getNativeTokenSymbol = (chain) => {
        switch (chain) {
                case "Matic": {
                        return ["matic-network", "matic"];
                }
                case "avax": {
                        return ["avalanche-2", "avax"];
                }
                case "bsc": {
                        return ["binancecoin", "bnb"];
                }
                default: {
                        return ["ethereum", "ETH"];
                }
        }
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
                raw: true,
        });

        return geckoChainId.geckoChainId;
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
                const apiUrl = `https://api.coingecko.com/api/v3/simple/token_price`;
                const url = `${apiUrl}/${chainId}?contract_addresses=${ca}&vs_currencies=${fiat}`;

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

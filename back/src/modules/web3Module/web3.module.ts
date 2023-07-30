import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Web3Provider } from "./web3.provider";

@Module({
        providers: [
                Web3Provider,
                {
                        provide: "BlockchainConfig",
                        inject: [ConfigService],
                        useFactory: (configService: ConfigService) => {
                                return {
                                        alchemy: {
                                                Ethereum: {
                                                        url: "mainnet",
                                                        apiKey: configService.get(
                                                                "ALCHEMY_ETHERUM_MAINNET_KEY"
                                                        ),
                                                },
                                                Matic: {
                                                        url: "matic",
                                                        apiKey: configService.get(
                                                                "ALCHEMY_POLYGON_MAINNET_KEY"
                                                        ),
                                                },
                                                "Arbitrum One": {
                                                        url: "arbitrum",
                                                        apiKey: configService.get(
                                                                "ALCHEMY_ARBITRUM_MAINNET_KEY"
                                                        ),
                                                },
                                                Optimism: {
                                                        url: "optimism",
                                                        apiKey: configService.get(
                                                                "ALCHEMY_OPTIMISM_MAINNET_KEY"
                                                        ),
                                                },
                                                goerli: {
                                                        url: "goerli",
                                                        apiKey: configService.get(
                                                                "ALCHEMY_ETHEREUM_GOERLI_KEY"
                                                        ),
                                                },
                                        },
                                        infura: {
                                                mainnet: {
                                                        url: "mainnet",
                                                        apiKey: configService.get(
                                                                "INFURA_KEY"
                                                        ),
                                                },
                                                // 아직 ethers의 infura provider에서 지원하지 않는듯
                                                // 나중에 지원하면 이걸로 바꾸고, 지금은 그냥 jsonprovider 사용
                                                // linea: {
                                                //         url: "linea",
                                                //         apiKey: configService.get(
                                                //                 "INFURA_LINEA_MAINNET_KEY"
                                                //         ),
                                                // },
                                        },
                                        etc: {
                                                avax: {
                                                        url: "https://api.avax.network/ext/bc/C/rpc",
                                                },
                                                bsc: {
                                                        url: "https://bsc-dataseed1.defibit.io",
                                                },
                                                zksync: {
                                                        url: "https://mainnet.era.zksync.io",
                                                },
                                                linea: {
                                                        url:
                                                                `https://linea-mainnet.infura.io/v3/` +
                                                                `${configService.get(
                                                                        "INFURA_KEY"
                                                                )}`,
                                                },
                                        },
                                };
                        },
                },
        ],
        exports: [Web3Provider],
})
export class Web3Module {}

import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Web3Service } from "./web3.service";
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
                                                mainnet: {
                                                        url: "mainnet",
                                                        apiKey: configService.get(
                                                                "ALCHEMY_ETHERUM_MAINNET_KEY"
                                                        ),
                                                },
                                                matic: {
                                                        url: "matic",
                                                        apiKey: configService.get(
                                                                "ALCHEMY_POLYGON_MAINNET_KEY"
                                                        ),
                                                },
                                                arbitrum: {
                                                        url: "arbitrum",
                                                        apiKey: configService.get(
                                                                "ALCHEMY_ARBITRUM_MAINNET_KEY"
                                                        ),
                                                },
                                                optimism: {
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
                                                                "INFURA_ETHEREUM_MAINNET_KEY"
                                                        ),
                                                },
                                                // avalanche: {
                                                //         url: "avalanche",
                                                //         apiKey: configService.get(
                                                //                 "INFURA_AVALANCHE_MAINNET_KEY"
                                                //         ),
                                                // },
                                        },
                                };
                        },
                },
        ],
        exports: [Web3Provider],
})
export class Web3Module {}

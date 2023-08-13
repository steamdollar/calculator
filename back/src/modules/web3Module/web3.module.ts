import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Web3Provider } from "./web3.provider";
import { ethersFactory } from "../../config/web3.config";

@Module({
        providers: [
                Web3Provider,
                {
                        provide: "BlockchainConfig",
                        inject: [ConfigService],
                        useFactory: ethersFactory,
                },
        ],
        exports: [Web3Provider],
})
export class Web3Module {}

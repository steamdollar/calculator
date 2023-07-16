import { Injectable, Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InfuraProvider, AlchemyProvider, JsonRpcProvider } from "ethers";

@Injectable()
export class Web3Provider {
        private readonly providers: Map<
                string,
                AlchemyProvider | InfuraProvider | JsonRpcProvider
        >;

        constructor(@Inject("BlockchainConfig") config: any) {
                this.providers = new Map<
                        string,
                        AlchemyProvider | InfuraProvider | JsonRpcProvider
                >();

                for (const service in config) {
                        for (const network in config[service]) {
                                const { url, apiKey } =
                                        config[service][network];

                                const key = `${service}-${network}`;

                                if (service === "alchemy") {
                                        this.providers.set(
                                                key,
                                                new AlchemyProvider(url, apiKey)
                                        );
                                } else if (service === "infura") {
                                        this.providers.set(
                                                key,
                                                new InfuraProvider(url, apiKey)
                                        );
                                } else if (service === "etc") {
                                        this.providers.set(
                                                key,
                                                new JsonRpcProvider(url)
                                        );
                                }
                        }
                }
        }

        getProvider(service: string, network: string) {
                const key = `${service}-${network}`;
                return this.providers.get(key);
        }
}

import { Injectable, OnModuleInit } from "@nestjs/common";
import axiois from "axios";

@Injectable()
export class InitService implements OnModuleInit {
        private data: any;

        async onModuleInit() {
                await this.getChainIdInfo();
        }

        async getChainIdInfo() {
                const url = `https://api.coingecko.com/api/v3/asset_platforms`;
                try {
                        const response = await axiois.get(url);
                        this.data = response.data;
                } catch (e) {
                        console.error(
                                "Failed to get chain Id info : ",
                                e.message
                        );
                }
        }

        getChainData(chain: string) {
                const chainConfigs = this.data;
                const chainSelected = chainConfigs.find(
                        (obj) =>
                                obj.id.includes(chain || chain.toLowerCase()) ||
                                obj.name.includes(
                                        chain || chain.toLowerCase()
                                ) ||
                                obj.shortname.includes(
                                        chain || chain.toLowerCase()
                                )
                );

                return chainSelected;
        }
}

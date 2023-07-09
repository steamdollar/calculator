import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Coin } from "../../models/coin.model";
import { makeResponseObj, responseObj } from "../../@types/response";
import { Web3Provider } from "../web3Module/web3.provider";
import {
        balanceResponse,
        getTokenBalance,
        makeBalanceResponse,
        makeTokenList,
        selectService,
} from "./balance.utils";
import { RedisService } from "../../utils/redis.service";

@Injectable()
export class BalanceService {
        constructor(
                @InjectModel(Coin) private coinModel: typeof Coin,
                private readonly web3Provider: Web3Provider,
                private readonly redisService: RedisService
        ) {}

        async getBalance(
                address: string,
                chain: string,
                fiat?: string
        ): Promise<responseObj | balanceResponse> {
                const key = `wallet:${chain}:${address}`;

                let assetData = await this.redisService.get(key);

                if (
                        assetData &&
                        new Date().getTime() - assetData.timestamp < 60 * 1000
                ) {
                        console.log("send cached data");
                        return makeBalanceResponse(assetData.data);
                }

                try {
                        const tokenList = await this.coinModel.findAll({
                                where: {
                                        chain: chain,
                                },
                        });

                        const tokensToReq = makeTokenList(tokenList);

                        let service = selectService(chain);

                        const provider = this.web3Provider.getProvider(
                                service,
                                chain
                        );

                        const balances = await getTokenBalance(
                                address,
                                tokensToReq,
                                provider,
                                chain
                        );

                        await this.redisService.set(key, {
                                data: balances,
                                timestamp: new Date().getTime(),
                        });

                        return makeBalanceResponse(balances);
                } catch (e) {
                        console.log(e.message);
                        return makeResponseObj(1, e.message);
                }
        }
}

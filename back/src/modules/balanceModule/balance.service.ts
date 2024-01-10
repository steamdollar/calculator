import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Coin } from "../../models/coin.model";
import { makeResponseObj, responseObj } from "../../@types/response";
import { Web3Provider } from "../web3Module/web3.provider";

import { RedisService } from "../../utils/redis.service";
import { BalanceProvider } from "./balance.provider";
import { balanceResponse } from "./balance.type";

@Injectable()
export class BalanceService {
        constructor(
                @InjectModel(Coin) private coinModel: typeof Coin,
                private readonly web3Provider: Web3Provider,
                private readonly redisService: RedisService,
                private readonly balanceUtils: BalanceProvider
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
                        return this.balanceUtils.makeBalanceResponse(
                                assetData.data
                        );
                }

                try {
                        const tokenList = await this.coinModel.findAll({
                                where: {
                                        chain: chain,
                                },
                        });

                        const balances =
                                await this.balanceUtils.getTokenBalance(
                                        address,
                                        tokenList.map((v) => v.dataValues.ca),
                                        this.web3Provider.getProvider(
                                                this.balanceUtils.selectService(
                                                        chain
                                                ),
                                                chain
                                        ),
                                        chain
                                );

                        await this.redisService.set(key, {
                                data: balances,
                                timestamp: new Date().getTime(),
                        });

                        return this.balanceUtils.makeBalanceResponse(balances);
                } catch (e) {
                        console.log(e.message);
                        return makeResponseObj(1, e.message);
                }
        }
}

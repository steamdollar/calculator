import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Sequelize } from "sequelize-typescript";
import { makeResponseObj, responseObj } from "../../@types/response";
import { TxService } from "../../utils/tx.service";
import { Coin } from "../../models/coin.model";
import { Wallet } from "../../models/wallet.model";
import { coinInfoDTO } from "./coin.type";

@Injectable()
export class CoinService {
        constructor(
                @InjectModel(Coin) private coinModel: typeof Wallet,
                private TxService: TxService
        ) {}

        async saveCoinData(coinInfoDTD: coinInfoDTO): Promise<responseObj> {
                return this.TxService.withTransaction(async (txHost) => {
                        const dataSaved = { ...coinInfoDTD };
                        try {
                                const existingCoin =
                                        await this.coinModel.findOne({
                                                where: {
                                                        token: dataSaved.token,
                                                        symbol: dataSaved.symbol,
                                                        chain: dataSaved.chain,
                                                        ca: dataSaved.ca,
                                                },
                                                transaction: txHost.transaction,
                                        });

                                if (existingCoin) {
                                        throw new Error(
                                                "this token is already registered"
                                        );
                                }

                                await this.coinModel.create(dataSaved, txHost);

                                return makeResponseObj(
                                        0,
                                        "successfully saved token data"
                                );
                        } catch (e) {
                                console.log(e.message);
                                return makeResponseObj(1, e.message);
                        }
                });
        }
}

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Sequelize } from "sequelize-typescript";
import { Trading } from "../models/trading.model";
import { makeResponseObj, responseObj } from "../@types/response";
import { receivedDataForSave } from "./tradingType";

@Injectable()
export class TradingService {
        constructor(
                @InjectModel(Trading) private tradingModel: typeof Trading,
                private sequelize: Sequelize
        ) {}

        async saveTradingData(
                tradingData: receivedDataForSave
        ): Promise<responseObj> {
                let response: responseObj;
                const dataSaved = { ...tradingData, date: new Date() };

                const createTradingData = async () => {
                        try {
                                await this.sequelize.transaction(async (t) => {
                                        const transactionHost = {
                                                transaction: t,
                                        };

                                        await this.tradingModel.create(
                                                dataSaved,
                                                transactionHost
                                        );
                                });
                        } catch (e) {
                                console.log(e.message);
                                throw new Error(
                                        "err : failed to save trading record"
                                );
                        }
                };

                try {
                        await createTradingData();
                        response = makeResponseObj(
                                0,
                                "data successfully saved"
                        );
                } catch (e) {
                        console.log(e.message);
                        response = makeResponseObj(
                                1,
                                "err : failed to save trading record"
                        );
                } finally {
                        return response;
                }
        }
}

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Sequelize } from "sequelize-typescript";
import { Wallet } from "../models/wallet.model";
import { makeResponseObj, responseObj } from "../@types/response";
import { walletDTO } from "./walletType";

@Injectable()
export class WalletService {
        constructor(
                @InjectModel(Wallet) private walletModel: typeof Wallet,
                private sequelize: Sequelize
        ) {}

        async saveWalletData(walletDTO: walletDTO): Promise<responseObj> {
                let response: responseObj;
                const dataSaved = { ...walletDTO };

                const createTradingData = async () => {
                        try {
                                await this.sequelize.transaction(async (t) => {
                                        const transactionHost = {
                                                transaction: t,
                                        };

                                        await this.walletModel.create(
                                                dataSaved,
                                                transactionHost
                                        );
                                });
                        } catch (e) {
                                console.log(e.message);
                                throw new Error(
                                        "err : failed to save wallet record"
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
                        response = makeResponseObj(1, e.message);
                } finally {
                        return response;
                }
        }

        async getMyWalletInfo(): Promise<walletDTO[] | responseObj> {
                let response: walletDTO[] | responseObj;
                // TODO : 이 db랑 상호작용하는 함수들 다 여기 지저분 하게 놔둬야 하나?
                // 다른데로 빼두면 외않됌?
                const retreiveWalletData = async () => {
                        try {
                                const walletData =
                                        await this.sequelize.transaction(
                                                async (t) => {
                                                        const transactionHost =
                                                                {
                                                                        transaction:
                                                                                t,
                                                                };

                                                        return await this.walletModel.findAll(
                                                                {
                                                                        ...transactionHost,
                                                                }
                                                        );
                                                }
                                        );
                                return walletData;
                        } catch (e) {
                                console.log(e.message);
                                throw new Error(
                                        "err : failed to get wallet data"
                                );
                        }
                };

                try {
                        response = await retreiveWalletData();
                } catch (e) {
                        response = makeResponseObj(1, e.message);
                } finally {
                        return response;
                }
        }
}

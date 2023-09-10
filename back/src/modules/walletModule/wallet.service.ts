import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Sequelize } from "sequelize-typescript";
import { Wallet } from "../../models/wallet.model";
import { makeResponseObj, responseObj } from "../../@types/response";
import { walletDTO } from "./wallet.type";
import { TxService } from "../../utils/tx.service";

@Injectable()
export class WalletService {
        constructor(
                @InjectModel(Wallet) private walletModel: typeof Wallet,
                private sequelize: Sequelize,
                private TxService: TxService
        ) {}

        async saveWalletData(walletDTO: walletDTO): Promise<responseObj> {
                return this.TxService.withTransaction(async (txHost) => {
                        const dataSaved = { ...walletDTO };
                        try {
                                const existingWallet =
                                        await this.walletModel.findOne({
                                                where: {
                                                        address: dataSaved.address,
                                                },
                                                transaction: txHost.transaction,
                                        });

                                if (existingWallet) {
                                        throw new Error(
                                                "this wallet is already registered"
                                        );
                                }

                                await this.walletModel.create(
                                        dataSaved,
                                        txHost
                                );

                                return makeResponseObj(
                                        0,
                                        "successfully saved wallet data"
                                );
                        } catch (e) {
                                console.log(e.message);
                                return makeResponseObj(1, e.message);
                        }
                });
        }

        async getMyWalletInfo(): Promise<walletDTO[] | responseObj> {
                let response: walletDTO[] | responseObj;
                // TODO : 이 db랑 상호작용하는 함수들 다 여기 지저분 하게 놔둬야 하나?
                // this가 있는데 어떻게 분리해내지?
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

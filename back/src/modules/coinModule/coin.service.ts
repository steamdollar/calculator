import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Sequelize } from "sequelize-typescript";
import { makeResponseObj, responseObj } from "../../@types/response";
import { TxService } from "../../utils/tx.service";
import { Coin } from "../../models/coin.model";
import { Wallet } from "../../models/wallet.model";
import { addressForCheck, addressInfo, coinInfoDTO } from "./coin.type";
import { Web3Provider } from "../web3Module/web3.provider";
import { ContractFactory, ethers } from "ethers";
import { minErc20Abi } from "../../utils/abi";
import { selectService } from "../balanceModule/balance.utils";

@Injectable()
export class CoinService {
        constructor(
                @InjectModel(Coin) private coinModel: typeof Wallet,
                private TxService: TxService,
                private readonly web3Provider: Web3Provider
        ) {}

        async checkIfCoin(
                coinForCheck: addressForCheck
        ): Promise<addressInfo | responseObj> {
                const { address, chain } = coinForCheck;

                let service = selectService(chain);

                const provider = this.web3Provider.getProvider(service, chain);
                try {
                        const contract = new ethers.Contract(
                                address,
                                minErc20Abi,
                                provider
                        );

                        const [name, symbol, decimals] = await Promise.all([
                                contract.name(),
                                contract.symbol(),
                                contract.decimals(),
                        ]);

                        return {
                                isToken: true,
                                decimals: Number(decimals),
                                name,
                                symbol,
                        };
                } catch (e) {
                        console.log(e);
                        if (e.info.method == "name") {
                                const msg =
                                        "address requested is not for a token";
                                console.log(msg);
                                return { isToken: false, msg };
                        }
                        return makeResponseObj(
                                1,
                                "unknown error, please try again later."
                        );
                }
        }

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

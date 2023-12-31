import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Sequelize } from "sequelize-typescript";
import { makeResponseObj, responseObj } from "../../@types/response";
import { TxService } from "../../utils/tx.service";
import { Coin } from "../../models/coin.model";
import { Wallet } from "../../models/wallet.model";
import {
        addressForCheck,
        addressInfo,
        coinInfoDTO,
        coinListResponse,
} from "./coin.type";
import { Web3Provider } from "../web3Module/web3.provider";
import { ethers } from "ethers";
import { minErc20Abi } from "../../utils/abi";
import { BalanceUtils } from "../balanceModule/balance.provider";

@Injectable()
export class CoinService {
        constructor(
                @InjectModel(Coin) private coinModel: typeof Wallet,
                private TxService: TxService,
                private readonly web3Provider: Web3Provider,
                private readonly balanceProvider: BalanceUtils
        ) {}

        async checkIfCoin(
                coinForCheck: addressForCheck
        ): Promise<addressInfo | responseObj> {
                const { address, chain } = coinForCheck;

                const provider = this.web3Provider.getProvider(
                        this.balanceProvider.selectService(chain),
                        chain
                );
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
                                                        chain: dataSaved.chain,
                                                        ca: dataSaved.ca,
                                                        symbol: dataSaved.symbol,
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

        async getCoinList(
                chain: string
        ): Promise<coinListResponse | responseObj> {
                try {
                        const coinList = await Coin.findAll({
                                where: {
                                        chain: chain,
                                },
                                attributes: ["symbol", "ca"],
                                raw: true,
                        });
                        return { chain, coinList, status: 0, msg: "done" };
                } catch (e) {
                        console.log(e);
                        return makeResponseObj(
                                1,
                                "failed to retrieve coin list of designated network."
                        );
                }
        }
}

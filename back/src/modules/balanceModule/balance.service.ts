import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Coin } from "../../models/coin.model";
import { makeResponseObj, responseObj } from "../../@types/response";
import { minErc20Abi } from "../../utils/abi";
import { Web3Provider } from "../web3Module/web3.provider";
import { ethers } from "ethers";
import {
        balanceResponse,
        getTokenBalance,
        makeBalanceResponse,
        makeTokenList,
        selectService,
} from "./balance.utils";

@Injectable()
export class BalanceService {
        constructor(
                @InjectModel(Coin) private coinModel: typeof Coin,
                private readonly web3Provider: Web3Provider
        ) {}

        async getBalance(
                address: string,
                chain: string
        ): Promise<responseObj | balanceResponse> {
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

                        return makeBalanceResponse(balances);
                } catch (e) {
                        console.log(e.message);
                        return makeResponseObj(1, e.message);
                }
        }
}

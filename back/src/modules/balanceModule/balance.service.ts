import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Coin } from "../../models/coin.model";
import { makeResponseObj, responseObj } from "../../@types/response";
import { ConfigService } from "@nestjs/config";
import { minErc20Abi } from "../../utils/abi";

@Injectable()
export class BalanceService {
        constructor(
                @InjectModel(Coin) private coinModel: typeof Coin,
                private readonly configService: ConfigService
        ) {}

        async getBalance(address: string, chain: string): Promise<any> {
                try {
                        let tokenToReq = [];
                        const tokenList = await this.coinModel.findAll({
                                where: {
                                        chain: chain,
                                },
                        });

                        for (let i = 0; i < tokenList.length; i++) {
                                tokenToReq.push(tokenList[i].dataValues.ca);
                        }

                        // for (const token of tokenToReq) {

                        // }
                } catch (e) {
                        console.log(e.message);
                        return makeResponseObj(1, e.message);
                }
        }
}

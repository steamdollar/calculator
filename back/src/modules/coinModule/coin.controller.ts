import { Controller, Get, Post, Body, Query } from "@nestjs/common";
import { responseObj } from "../../@types/response";
import { CoinService } from "./coin.service";
import {
        addressForCheck,
        addressInfo,
        coinInfoDTO,
        networkInfo,
} from "./coin.type";

@Controller("coin")
export class CoinController {
        constructor(private readonly coinService: CoinService) {}

        @Get("/checkCoinInfo")
        async checkCoinInfo(
                @Query() coinInfo: addressForCheck
        ): Promise<addressInfo | responseObj> {
                return await this.coinService.checkIfCoin(coinInfo);
        }

        @Post("/saveCoinInfo")
        async saveCoinInfo(
                @Body() coinData: coinInfoDTO
        ): Promise<responseObj> {
                return await this.coinService.saveCoinData(coinData);
        }

        @Get("/getCoinList")
        async getCoinList(@Query() network: networkInfo): Promise<any> {
                const chain = network.network;
                return await this.coinService.getCoinList(chain);
        }
}

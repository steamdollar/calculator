import { Controller, Get, Post, Body, Query } from "@nestjs/common";
import { responseObj } from "../../@types/response";
import { CoinService } from "./coin.service";
import { addressForCheck, addressInfo, coinInfoDTO } from "./coin.type";

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
}

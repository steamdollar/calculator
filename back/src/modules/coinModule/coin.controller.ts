import { Controller, Get, Post, Body } from "@nestjs/common";
import { timeStamp } from "console";
import { responseObj } from "../../@types/response";
import { CoinService } from "./coin.service";
import { coinInfoDTO } from "./coin.type";

@Controller("coin")
export class CoinController {
        constructor(private readonly coinService: CoinService) {}

        @Post("/saveCoinInfo")
        async saveCoinInfo(
                @Body() coinData: coinInfoDTO
        ): Promise<responseObj> {
                return await this.coinService.saveCoinData(coinData);
        }
}

import { Controller, Get, Post, Body } from "@nestjs/common";
import { responseObj } from "../../@types/response";
import { TradingService } from "./trading.service";
import { receivedDataForSave } from "./tradingType";

@Controller("trading")
export class TradingController {
        constructor(private readonly tradingService: TradingService) {}

        @Post("/saveTradingData")
        async saveTradingData(
                @Body() tradingData: receivedDataForSave
        ): Promise<responseObj> {
                return await this.tradingService.saveTradingData(tradingData);
        }
}

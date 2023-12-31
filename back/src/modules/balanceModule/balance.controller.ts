import { Controller, Get, Post, Body, Query } from "@nestjs/common";

import { responseObj } from "../../@types/response";
import { BalanceService } from "./balance.service";
import { balanceResponse } from "./balance.type";

@Controller("balance")
export class BalanceController {
        constructor(private readonly BalanceService: BalanceService) {}

        @Get("/getbalance")
        async getBalance(
                @Query("address") address: string,
                @Query("chain") chain: string
        ): Promise<responseObj | balanceResponse> {
                return this.BalanceService.getBalance(address, chain);
        }
}

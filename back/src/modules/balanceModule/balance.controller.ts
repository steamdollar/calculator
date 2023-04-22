import { Controller, Get, Post, Body, Query } from "@nestjs/common";

import { responseObj } from "../../@types/response";
import { BalanceService } from "./balance.service";

@Controller("balance")
export class BalanceController {
        constructor(private readonly BalanceService: BalanceService) {}

        @Get("/getbalance")
        async getBalance(
                @Query("address") address: string,
                @Query("chain") chain: string
        ): Promise<any> {
                return this.BalanceService.getBalance(address, chain);
        }
}

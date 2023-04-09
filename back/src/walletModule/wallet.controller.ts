import { Controller, Get, Post, Body } from "@nestjs/common";
import { responseObj } from "../@types/response";
import { WalletService } from "./wallet.service";
import { walletDTO } from "./walletType";

@Controller("wallet")
export class WalletController {
        constructor(private readonly walletService: WalletService) {}

        @Post("/saveWallet")
        async saveTradingData(
                @Body() walletData: walletDTO
        ): Promise<responseObj> {
                return await this.walletService.saveWalletData(walletData);
        }
}

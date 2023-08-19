import { Controller, Get, Post, Body, Req } from "@nestjs/common";
import { responseObj } from "../../@types/response";
import { WalletService } from "./wallet.service";
import { walletDTO } from "./wallet.type";

@Controller("wallet")
export class WalletController {
        constructor(private readonly walletService: WalletService) {}

        @Get("getMyWalletInfo")
        async getMyWalletInfo(): Promise<walletDTO[] | responseObj> {
                return await this.walletService.getMyWalletInfo();
        }

        @Post("/saveWallet")
        async saveWalletData(
                @Body() walletData: walletDTO
        ): Promise<responseObj> {
                return await this.walletService.saveWalletData(walletData);
        }
}

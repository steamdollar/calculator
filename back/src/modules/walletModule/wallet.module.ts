import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { TxService } from "../../utils/tx.service";
import { Wallet } from "../../models/wallet.model";
import { WalletController } from "./wallet.controller";
import { WalletService } from "./wallet.service";

@Module({
        imports: [SequelizeModule.forFeature([Wallet])],
        controllers: [WalletController],
        providers: [WalletService, TxService],
})
export class WalletModule {}

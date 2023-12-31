import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { TxService } from "../../utils/tx.service";
import { Coin } from "../../models/coin.model";
import { CoinController } from "./coin.controller";
import { CoinService } from "./coin.service";
import { Web3Module } from "../web3Module/web3.module";
import { BalanceUtils } from "../balanceModule/balance.provider";

@Module({
        imports: [SequelizeModule.forFeature([Coin]), Web3Module],
        controllers: [CoinController],
        providers: [CoinService, TxService, BalanceUtils],
})
export class CoinModule {}

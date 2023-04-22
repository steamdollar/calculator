import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Coin } from "../../models/coin.model";
import { Web3Module } from "../web3Module/web3.module";
import { BalanceController } from "./balance.controller";
import { BalanceService } from "./balance.service";

@Module({
        imports: [
                ConfigModule.forRoot(),
                SequelizeModule.forFeature([Coin]),
                Web3Module,
        ],
        controllers: [BalanceController],
        providers: [BalanceService],
})
export class BalanceModule {}

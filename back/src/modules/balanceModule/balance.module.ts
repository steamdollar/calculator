import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { InitService } from "../../utils/init.service";
import { Coin } from "../../models/coin.model";
import { Web3Module } from "../web3Module/web3.module";
import { BalanceController } from "./balance.controller";
import { BalanceService } from "./balance.service";
import { Gecko } from "../../models/gecko.model";
import { RedisService } from "../../utils/redis.service";
import { BalanceProvider } from "./balance.provider";

@Module({
        imports: [SequelizeModule.forFeature([Coin, Gecko]), Web3Module],
        controllers: [BalanceController],
        providers: [BalanceService, InitService, RedisService, BalanceProvider],
})
export class BalanceModule {}

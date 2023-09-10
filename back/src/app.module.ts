import { Module, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { SequelizeModule } from "@nestjs/sequelize";
import { Sequelize } from "sequelize-typescript";

// modules
import { TradingModule } from "./modules/tradingModule/trading.module";
import { WalletModule } from "./modules/walletModule/wallet.module";
import { CoinModule } from "./modules/coinModule/coin.module";
import { BalanceModule } from "./modules/balanceModule/balance.module";
// import { Web3Module } from "./modules/web3Module/web3.module";
import { InitService } from "./utils/init.service";
import { LoginModule } from "./modules/loginModule/login.module";
import { sequelizeConfig } from "./config/db.config";
import { CheckCookieMiddleware } from "./utils/cookieMiddleware";

@Module({
        imports: [
                ConfigModule.forRoot({ isGlobal: true }),
                SequelizeModule.forRootAsync({
                        imports: [ConfigModule],
                        inject: [ConfigService],
                        useFactory: sequelizeConfig,
                }),
                TradingModule,
                WalletModule,
                CoinModule,
                BalanceModule,
                LoginModule,
                // Web3Module,
        ],
        controllers: [AppController],
        providers: [AppService, InitService],
})
export class AppModule {
        constructor(private sequelize: Sequelize) {}

        configure(consumer: MiddlewareConsumer) {
                consumer.apply(CheckCookieMiddleware).forRoutes({
                        path: "*",
                        method: RequestMethod.ALL,
                });
        }
}

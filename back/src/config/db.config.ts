import { Wallet } from "../models/wallet.model";
import { Trading } from "../models/trading.model";
import { Coin } from "../models/coin.model";
import { Gecko } from "../models/gecko.model";
import { SequelizeModuleOptions } from "@nestjs/sequelize";
import { ConfigService } from "@nestjs/config";
import { Ids } from "../models/ids.model";

export const sequelizeConfig = (
        configService: ConfigService
): SequelizeModuleOptions => ({
        dialect: "mysql",
        host: configService.get("DB_HOST"),
        port: +configService.get("DB_PORT"),
        username: configService.get("DB_USER"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_NAME"),
        models: [Wallet, Trading, Gecko, Coin, Ids],
});

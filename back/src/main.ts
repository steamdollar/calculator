import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";

import { Sequelize } from "sequelize-typescript";
import { AppModule } from "./app.module";
import { Wallet } from "./models/wallet.model";
import {
        initGeckochainId,
        initTokenList,
        initTradingRecord,
} from "./utils/db/dbRef";
import { Trading } from "./models/trading.model";
import { Coin } from "./models/coin.model";
import { Gecko } from "./models/gecko.model";

async function bootstrap() {
        const app = await NestFactory.create(AppModule);
        app.use(cookieParser());
        const configService = app.get(ConfigService);
        const sequelize = app.get<Sequelize>(Sequelize);

        const forceSync = false;

        await sequelize.sync({ force: forceSync });

        // add test data to db

        if (forceSync) {
                (async () => {
                        await Wallet.create({
                                address: configService.get("shield1"),
                                name: "shield1",
                        });
                        await Wallet.create({
                                address: configService.get("ledger1"),
                                name: "ledger1",
                        });

                        initTradingRecord.forEach(async (record) => {
                                await Trading.create(record);
                        });

                        initTokenList.forEach(async (record) => {
                                await Coin.create(record);
                        });

                        initGeckochainId.forEach(async (record) => {
                                await Gecko.create(record);
                        });
                })();
        }

        const allowedOrigin = [configService.get("FRONTEND_ADDRESS")];

        app.enableCors({
                origin: (origin, callback) => {
                        if (!origin || allowedOrigin.includes(origin)) {
                                callback(null, true);
                        } else {
                                callback(new Error("not allowed by cors"));
                        }
                },
                credentials: true,
                methods: "GET, POST, PUT, DELETE, HEAD",
        });

        await app.listen(configService.get<number>("BACKEND_PORT"));
        console.log(
                `backend server run at port ${configService.get<string>(
                        "BACKEND_PORT"
                )}`
        );
}

bootstrap();

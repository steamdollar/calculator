import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { Sequelize } from "sequelize-typescript";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import { Wallet } from "./models/wallet.model";
import { initTokenList, initTradingRecord } from "./utils/dbRef";
import { Trading } from "./models/trading.model";
import { Coin } from "./models/coin.model";

dotenv.config();

async function bootstrap() {
        const app = await NestFactory.create(AppModule);
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
                                purpose: "airdrop",
                        });
                        await Wallet.create({
                                address: configService.get("ledger1"),
                                name: "ledger1",
                                purpose: "airdrop, saving",
                        });

                        for (let i = 0; i < initTradingRecord.length; i++) {
                                await Trading.create(initTradingRecord[i]);
                        }

                        for (let i = 0; i < initTokenList.length; i++) {
                                await Coin.create(initTokenList[i]);
                        }
                })();
        }

        const allowedOrigin = [
                configService.get("FRONTEND_ADDRESS"),
                configService.get("FRONTEND_ADDRESS2"),
        ];

        app.enableCors({
                origin: (origin, callback) => {
                        if (!origin || allowedOrigin.includes(origin)) {
                                callback(null, true);
                        } else {
                                callback(new Error("not allowed by cors"));
                        }
                },
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

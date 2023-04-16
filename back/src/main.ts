import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { Sequelize } from "sequelize-typescript";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";

dotenv.config();

async function bootstrap() {
        const app = await NestFactory.create(AppModule);
        const configService = app.get(ConfigService);
        const sequelize = app.get<Sequelize>(Sequelize);

        await sequelize.sync({ force: true });

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

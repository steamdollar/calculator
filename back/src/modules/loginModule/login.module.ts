import { Module } from "@nestjs/common";
import { LoginController } from "./login.controller";
import { LoginService } from "./login.service";
import { LoginProvider } from "./login.provider";

@Module({
        controllers: [LoginController],
        providers: [LoginService, LoginProvider],
})
export class LoginModule {}

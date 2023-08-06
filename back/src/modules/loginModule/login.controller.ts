import { Controller, Get, Query, Res } from "@nestjs/common";
import { LoginService } from "./login.service";
import { ConfigService } from "@nestjs/config";

@Controller("login")
export class LoginController {
        constructor(
                private readonly loginService: LoginService,
                private readonly configService: ConfigService
        ) {}

        @Get("kakaoLogin")
        async tokakaoLoginPage(@Res() res) {
                const url = await this.loginService.toKakaoLoginPage();
                res.status(200).redirect(url);
        }

        @Get("kakaoToken")
        async getKakaoToken(@Query() code: string) {
                const as = await this.loginService.getKakaoToken(code);
                return "qwweqweqe";
        }
}

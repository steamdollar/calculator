import { Controller, Get, Query, Res } from "@nestjs/common";
import { LoginService } from "./login.service";
import { ConfigService } from "@nestjs/config";
import { Response } from "express";

@Controller("login")
export class LoginController {
        constructor(
                private readonly loginService: LoginService,
                private readonly configService: ConfigService
        ) {}

        @Get("OauthLogin")
        async tokakaoLoginPage(@Res() res, @Query() s) {
                const url = await this.loginService.toOauthLoginPage(s.s);
                res.status(200).redirect(url);
        }

        @Get("kakaoToken")
        async getKakaoToken(@Res() res: Response, @Query() code: string) {
                const cookieString = await this.loginService.getKakaoToken(
                        code
                );

                // TODO : cookie config 변수화 > recycle
                res.cookie("userInfo", cookieString, {
                        // httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        maxAge: 1000 * 60 * 60 * 24,
                });
                // TODO : 프런트앤드의 url을 변수화
                res.redirect(this.configService.get("FRONTEND_ADDRESS"));
        }

        @Get("googleToken")
        async getGoogleToken(@Res() res: Response, @Query() code: string) {
                const cookieString = await this.loginService.getGoogleToken(
                        code
                );

                res.cookie("userInfo", cookieString, {
                        // httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        maxAge: 1000 * 60 * 60 * 24,
                });

                res.redirect(this.configService.get("FRONTEND_ADDRESS"));
        }
}

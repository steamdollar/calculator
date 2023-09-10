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

        @Get("kakaoLogin")
        async tokakaoLoginPage(@Res() res) {
                const url = await this.loginService.toKakaoLoginPage();
                res.status(200).redirect(url);
        }

        @Get("kakaoToken")
        async getKakaoToken(@Res() res: Response, @Query() code: string) {
                const cookieString = await this.loginService.getKakaoToken(
                        code
                );

                res.cookie("userInfo", cookieString, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        maxAge: 1000 * 60 * 60 * 24,
                });
                res.redirect("http://localhost:3000");
        }

        @Get("googleLogin")
        async googleLoginPage(@Res() res) {
                const url = await this.loginService.toGoogleLoginPage();
                res.status(200).redirect(url);
        }

        @Get("googleToken")
        async getGoogleToken(@Res() res: Response, @Query() code: string) {
                const cookieString = await this.loginService.getGoogleToken(
                        code
                );

                res.cookie("userInfo", cookieString, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        maxAge: 1000 * 60 * 60 * 24,
                });

                res.redirect("http://localhost:3000");
        }
}

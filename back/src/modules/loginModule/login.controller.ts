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
                let url: string;
                switch (s.s) {
                        case "kakao":
                                url =
                                        await this.loginService.toKakaoLoginPage();
                                break;
                        case "google":
                                url =
                                        await this.loginService.toGoogleLoginPage();
                                break;
                        default:
                                res.status(200).redirect(
                                        "http://localhost:3000"
                                );
                }

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
                // TODO : 프런트앤드의 url을 변수화
                res.redirect("http://localhost:3000");
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

import { Controller, Get, Query, Res } from "@nestjs/common";
import { LoginService } from "./login.service";
import { ConfigService } from "@nestjs/config";
import { Response } from "express";
import * as jwt from "jsonwebtoken";

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

        @Get("getToken")
        async getToken(@Res() res: Response, @Query() oAuthCode) {
                const cookieString = await this.loginService.getOAuthToken(
                        oAuthCode
                );

                const token = jwt.sign(
                        { data: cookieString },
                        this.configService.get("encode_salt"),
                        {
                                expiresIn: "24h",
                        }
                );

                res.cookie("userInfo", token, {
                        // httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        maxAge: 1000 * 60 * 60 * 24,
                });

                res.redirect(this.configService.get("FRONTEND_ADDRESS"));
        }
}

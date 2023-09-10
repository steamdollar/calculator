import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { ConfigService } from "@nestjs/config";
import * as jwt from "jsonwebtoken";
import { decrypter } from "../modules/loginModule/login.util";

@Injectable()
export class CheckCookieMiddleware implements NestMiddleware {
        constructor(private configService: ConfigService) {}

        use(req: Request, res: Response, next: NextFunction) {
                if (req.cookies && req.cookies["userInfo"]) {
                        // Retrieve the cookie
                        const encodedCookieWithSalt = req.cookies["userInfo"];

                        // Decode the base64-encoded cookie
                        const decoded = jwt.verify(
                                encodedCookieWithSalt,
                                this.configService.get<string>("encode_salt")
                        );

                        console.log(
                                decrypter(
                                        decoded,
                                        this.configService.get<string>(
                                                "encrypt_code"
                                        )
                                )
                        );
                } else {
                        console.log("Cookie userInfo is missing.");
                }

                next();
        }
}

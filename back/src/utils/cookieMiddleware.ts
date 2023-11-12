import { Injectable, NestMiddleware } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { Request, Response, NextFunction } from "express";
import { ConfigService } from "@nestjs/config";
import * as jwt from "jsonwebtoken";
import { decrypter } from "../modules/loginModule/login.util";
import { Ids } from "../models/ids.model";
import { TxService } from "./tx.service";

@Injectable()
export class CheckCookieMiddleware implements NestMiddleware {
        constructor(private configService: ConfigService) {}

        async use(req: Request, res: Response, next: NextFunction) {
                try {
                        if (req.cookies && req.cookies["userInfo"]) {
                                // Retrieve the cookie
                                const encodedCookie = req.cookies["userInfo"];

                                // Decode the base64-encoded cookie
                                const decoded = jwt.verify(
                                        encodedCookie,
                                        this.configService.get<string>(
                                                "encode_salt"
                                        )
                                );

                                const id = decrypter(
                                        decoded.data.s,
                                        this.configService.get<string>(
                                                "encrypt_code"
                                        )
                                ).id;

                                const isValidUser = await Ids.findOne({
                                        where: {
                                                ids: id,
                                        },
                                });

                                if (!isValidUser) {
                                        throw new Error("Invalid User");
                                }
                        } else {
                                console.log("Cookie userInfo is missing.");
                        }
                } catch (e) {
                        if (e instanceof jwt.JsonWebTokenError) {
                                // Handle JWT errors (e.g., invalid token, expired token)
                                console.error("JWT error: ", e.message);
                        } else if (e instanceof Error) {
                                // Handle generic errors or decryption errors
                                console.error("Error: ", e.message);
                        }
                }

                next();
        }
}

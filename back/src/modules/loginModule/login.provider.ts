import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import * as crypto from "crypto";
import { userInfoDTO } from "./login.type";

@Injectable()
export class LoginProvider {
        constructor() {}

        userInfoString = (userInfo: userInfoDTO): string => {
                const id = userInfo.id;
                const name = userInfo.name;
                const email = userInfo.email;
                const pic = userInfo.pic;

                const userInfoObj = { name, email, id, pic };
                const userInfoString = JSON.stringify(userInfoObj);
                return userInfoString;
        };

        encrypter = (text: string, secretKey: string) => {
                // 16 byte 크기 buffer라 중복될 염려는 없다.
                const iv = crypto.randomBytes(16);
                const hash = crypto.createHash("sha256");
                hash.update(secretKey);
                const key = hash.digest();
                const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
                let encrypted = cipher.update(text, "utf8", "hex");
                encrypted += cipher.final("hex");
                return iv.toString("hex") + ":" + encrypted;
        };

        encodeUserInfo = (userInfo: any, secret_key: string): string => {
                return jwt.sign(userInfo, secret_key);
        };

        decrypter = (text: string, secretKey: string) => {
                const parts = text.split(":");
                const iv = Buffer.from(parts.shift(), "hex");
                const encryptedText = parts.join(":");

                const hash = crypto.createHash("sha256");
                hash.update(secretKey);
                const key = hash.digest();

                const decipher = crypto.createDecipheriv(
                        "aes-256-cbc",
                        key,
                        iv
                );
                let decrypted = decipher.update(encryptedText, "hex", "utf8");
                decrypted += decipher.final("utf8");
                return JSON.parse(decrypted);
        };
}

import * as jwt from "jsonwebtoken";
import * as crypto from "crypto";

export const userInfoString = (userInfo: any): string => {
        const nickName = userInfo.properties.nickname;
        const email = userInfo.kakao_account.email;

        const userInfoObj = { nickName, email };
        const userInfoString = JSON.stringify(userInfoObj);
        return userInfoString;
};

// TOTHINK : 데이터들을 하나로 묶어서 암호화를 할 것인가,
// 아니면 각각의 데이터를 암호화해 줄것인가..
// 이번 경우는 데이터를 많이 받지 않아서 두 다 별 차이가 없겠지만..
// 역시 JSON을 stringify 해서 주는게 나은가..
export const encrypter = (text: string, secretKey: string) => {
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

export const encodeUserInfo = (userInfo: any, secret_key: string): string => {
        return jwt.sign(userInfo, secret_key);
};

export const decrypter = (text: string, secretKey: string) => {
        const parts = text.split(":");
        const iv = Buffer.from(parts.shift(), "hex");
        const encryptedText = parts.join(":");

        const hash = crypto.createHash("sha256");
        hash.update(secretKey);
        const key = hash.digest();

        const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
        let decrypted = decipher.update(encryptedText, "hex", "utf8");
        decrypted += decipher.final("utf8");
        return JSON.parse(decrypted);
};

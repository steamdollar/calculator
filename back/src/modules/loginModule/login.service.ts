import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import {
        encodeUserInfo,
        userInfoString,
        encrypter,
        decrypter,
} from "./login.util";
import { makeResponseObj } from "../../@types/response";
import { GoogleOAuth } from "./login.type";

@Injectable()
export class LoginService {
        private googleOAuthService: GoogleOAuth;

        constructor(private configService: ConfigService) {
                this.googleOAuthService = new GoogleOAuth();
        }

        async toKakaoLoginPage() {
                const clientId = this.configService.get("kakao_clientId");
                const redirectUrl =
                        this.configService.get("kakao_redirect_url");

                const url =
                        `https://kauth.kakao.com/oauth/authorize` +
                        `?client_id=${clientId}` +
                        `&redirect_uri=${redirectUrl}` +
                        `&response_type=code`;

                return url;
        }

        async getKakaoToken(code) {
                let access_token;
                let token_type;
                let refresh_token;
                let expires_in;
                let refresh_token_expires_in;

                try {
                        const url = "https://kauth.kakao.com/oauth/token?";

                        const headers = {
                                "Content-type":
                                        "application/x-www-form-urlencoded",
                        };

                        const qs =
                                `grant_type=authorization_code` +
                                `&client_id=${this.configService.get(
                                        "kakao_clientId"
                                )}` +
                                `&client_secret=${this.configService.get(
                                        "kakao_client_secret"
                                )}` +
                                `&redirectUri:${this.configService.get(
                                        "kakao_redirect_url"
                                )}` +
                                `&code=${code.code}`;

                        const response = await axios.post(url, qs, {
                                headers: headers,
                        });

                        access_token = response.data.access_token;
                        token_type = response.data.token_type;

                        // TODO : refresh token의 개념과 사용을 알아볼 것
                        refresh_token = response.data.refresh_token;
                        expires_in = response.data.expires_in;
                        refresh_token_expires_in =
                                response.data.refresh_token_expires_in;
                } catch (e) {
                        console.log(e);
                }

                try {
                        const url = "https://kapi.kakao.com/v2/user/me";
                        const header = {
                                headers: {
                                        Authorization: `${token_type} ${access_token}`,
                                },
                        };

                        const response = await axios.get(url, header);

                        const kakaoData = response.data.kakao_account;

                        const userInfo = {
                                id: response.data.id,
                                name: kakaoData.profile.nickname,
                                email: kakaoData.email,
                                pic: response.data.properties.thumbnail_image,
                        };

                        const cookieString = encodeUserInfo(
                                encrypter(
                                        userInfoString(userInfo),
                                        this.configService.get("encrypt_code")
                                ),
                                this.configService.get("encode_salt")
                        );

                        return cookieString;
                } catch (e) {
                        console.log(e);
                }
        }

        async toGoogleLoginPage() {
                const clientId = this.configService.get("google_clientId");
                const redirectUrl = this.configService.get(
                        "google_redirect_url"
                );

                return this.googleOAuthService.redirectToProvider({
                        clientId,
                        redirectUrl,
                });
        }

        async getGoogleToken(code) {
                const url = "https://oauth2.googleapis.com/token";
                const codeForToken = code.code;

                let access_token;

                try {
                        const response = await axios.post(url, {
                                code: codeForToken,
                                client_id: this.configService.get(
                                        "google_clientId"
                                ),
                                client_secret: this.configService.get(
                                        "google_client_secret"
                                ),
                                redirect_uri: this.configService.get(
                                        "google_redirect_url"
                                ),
                                grant_type: "authorization_code",
                        });

                        access_token = response.data.access_token;
                } catch (e) {
                        console.log(e);
                        makeResponseObj(1, "google login failed");
                }

                try {
                        const response = await axios.get(
                                "https://www.googleapis.com/oauth2/v2/userinfo",
                                {
                                        // Request Header에 Authorization 추가
                                        headers: {
                                                Authorization: `Bearer ${access_token}`,
                                        },
                                }
                        );

                        const googleData = response.data;

                        const userInfo = {
                                id: googleData.id,
                                email: googleData.email,
                                name: googleData.name,
                                pic: googleData.picture,
                        };

                        const cookieString = encodeUserInfo(
                                encrypter(
                                        userInfoString(userInfo),
                                        this.configService.get("encrypt_code")
                                ),
                                this.configService.get("encode_salt")
                        );

                        return cookieString;
                } catch (e) {
                        console.log(e);
                        makeResponseObj(1, "google login failed");
                }
        }
}

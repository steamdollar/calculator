import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { encodeUserInfo, userInfoString, encrypter } from "./login.util";
import { makeResponseObj } from "../../@types/response";
import { GoogleOAuth, reqTokenDTO, KakaoOauth } from "./login.type";
import { ErrorMessage } from "../../@types/error";

@Injectable()
export class LoginService {
        private googleOAuthService: GoogleOAuth;
        private kakaoOauthService: KakaoOauth;

        constructor(private configService: ConfigService) {
                this.googleOAuthService = new GoogleOAuth();
                this.kakaoOauthService = new KakaoOauth();
        }

        async toOauthLoginPage(service: string) {
                switch (service) {
                        case "kakao":
                                return this.kakaoOauthService.redirectToProvider(
                                        this.configService.get(
                                                "kakao_clientId"
                                        ),
                                        this.configService.get(
                                                "kakao_redirect_url"
                                        )
                                );
                        case "google":
                                return this.googleOAuthService.redirectToProvider(
                                        this.configService.get(
                                                "google_clientId"
                                        ),
                                        this.configService.get(
                                                "google_redirect_url"
                                        )
                                );
                        default:
                                return "http://localhost:3000";
                }
        }

        async getKakaoToken(code) {
                // TODO : refresh token
                // let refresh_token;
                // let expires_in;
                // let refresh_token_expires_in;

                try {
                        const args: reqTokenDTO = {
                                client_id: this.configService.get(
                                        "kakao_clientId"
                                ),
                                client_secret: this.configService.get(
                                        "kakao_client_secret"
                                ),
                                redirect_uri:
                                        this.configService.get(
                                                "kakao_redirect_url"
                                        ),
                                grant_type: "authorization_code",
                        };

                        const getAccessTokenResult =
                                await this.kakaoOauthService.getToken(
                                        code,
                                        args
                                );

                        const getUserInfoResult =
                                await this.kakaoOauthService.getUserInfo(
                                        getAccessTokenResult.result
                                );

                        const cookieString = encodeUserInfo(
                                encrypter(
                                        userInfoString(
                                                getUserInfoResult.userInfo
                                        ),
                                        this.configService.get("encrypt_code")
                                ),
                                this.configService.get("encode_salt")
                        );

                        return cookieString;
                } catch (e) {
                        console.log(e);
                        if (e instanceof ErrorMessage) {
                                makeResponseObj(
                                        1,
                                        `kakao login failed : ${e.message}`
                                );
                        }
                }
        }

        async getGoogleToken(code) {
                const args: reqTokenDTO = {
                        client_id: this.configService.get("google_clientId"),
                        client_secret: this.configService.get(
                                "google_client_secret"
                        ),
                        redirect_uri: this.configService.get(
                                "google_redirect_url"
                        ),
                        grant_type: "authorization_code",
                };

                try {
                        const getAccessToken =
                                await this.googleOAuthService.getToken(
                                        code,
                                        args
                                );

                        const getUserInfo =
                                await this.googleOAuthService.getUserInfo(
                                        getAccessToken.token
                                );

                        const cookieString = encodeUserInfo(
                                encrypter(
                                        userInfoString(getUserInfo.userInfo),
                                        this.configService.get("encrypt_code")
                                ),
                                this.configService.get("encode_salt")
                        );

                        return cookieString;
                } catch (e) {
                        console.log(e);

                        if (e instanceof ErrorMessage) {
                                makeResponseObj(
                                        1,
                                        `google login failed : ${e.message}`
                                );
                        }
                }
        }
}

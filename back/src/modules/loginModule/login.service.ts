import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { encodeUserInfo, userInfoString, encrypter } from "./login.util";
import { makeResponseObj } from "../../@types/response";
import { GoogleOAuth, reqTokenDTO, KakaoOauth } from "./login.type";

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
                let access_token;
                let token_type;
                let refresh_token;
                let expires_in;
                let refresh_token_expires_in;

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

                        if (getAccessTokenResult.status === 1) {
                                throw getAccessTokenResult.msg;
                        }

                        const tokenPackage = getAccessTokenResult.result;

                        const getUserInfoResult =
                                await this.kakaoOauthService.getUserInfo(
                                        tokenPackage
                                );

                        if (getUserInfoResult.status === 1) {
                                throw getAccessTokenResult.msg;
                        }

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
                        makeResponseObj(1, `google login failed : ${e}`);
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
                // TODO : 여전히 함수가 좀 길고 너저분하다. 더 리팩토링할 여지가 있을 듯
                try {
                        const getAccessTokenResult =
                                await this.googleOAuthService.getToken(
                                        code,
                                        args
                                );

                        if (getAccessTokenResult.status === 1) {
                                throw getAccessTokenResult.msg;
                        }

                        const getUserInfoResult =
                                await this.googleOAuthService.getUserInfo(
                                        getAccessTokenResult.token
                                );

                        if (getUserInfoResult.status === 1) {
                                throw getUserInfoResult.msg;
                        }

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
                        makeResponseObj(1, `google login failed : ${e}`);
                }
        }
}

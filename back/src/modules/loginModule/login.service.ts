import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";

@Injectable()
export class LoginService {
        constructor(private configService: ConfigService) {}

        async toKakaoLoginPage() {
                const clientId = this.configService.get("clientId");
                const redirectUrl = this.configService.get("redirect_url");

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
                                "content-type":
                                        "application/x-www-form-urlencoded",
                        };

                        const qs =
                                `grant_type=authorization_code` +
                                `&client_id=${this.configService.get(
                                        "clientId"
                                )}` +
                                `&client_secret=${this.configService.get(
                                        "client_secret"
                                )}` +
                                `&redirectUri:${this.configService.get(
                                        "redirect_url"
                                )}` +
                                `&code=${code.code}`;

                        const response = await axios.post(url, qs, {
                                headers: headers,
                        });

                        access_token = response.data.access_token;
                        token_type = response.data.token_type;
                        refresh_token = response.data.refresh_token;
                        expires_in = response.data.expires_in;
                        refresh_token_expires_in =
                                response.data.refresh_token_expires_in;
                } catch (e) {
                        console.log(e);
                }

                try {
                        const url = "http://kapi.kakao.com/v2/user/me";
                        const header = {
                                headers: {
                                        Authorization: `${token_type} ${access_token}`,
                                },
                        };
                } catch (e) {
                        console.log(e);
                }
        }
}

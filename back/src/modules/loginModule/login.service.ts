import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { makeResponseObj } from "../../@types/response";
import {
        GoogleOAuth,
        reqTokenDTO,
        KakaoOAuth,
        IOAuthProvider,
} from "./login.type";
import { ErrorMessage } from "../../@types/error";
import { LoginProvider } from "./login.provider";

@Injectable()
export class LoginService {
        private providers: Map<string, IOAuthProvider>;

        constructor(
                private configService: ConfigService,
                private readonly loginProviders: LoginProvider
        ) {
                this.providers = new Map<string, IOAuthProvider>();
                this.providers.set("google", new GoogleOAuth());
                this.providers.set("kakao", new KakaoOAuth());
        }

        async toOauthLoginPage(party: string) {
                const provider = this.providers.get(party);

                if (!provider) return this.configService.get("FRONT_ADDRESS");

                return provider.redirectToProvider(
                        this.configService.get(`${party}_clientId`),
                        this.configService.get(`${party}_redirect_url`)
                );
        }

        async getOAuthToken(oAuthcode) {
                const { party, code } = oAuthcode;

                const provider = this.providers.get(party);

                const args: reqTokenDTO = {
                        client_id: this.configService.get(`${party}_clientId`),
                        client_secret: this.configService.get(
                                `${party}_client_secret`
                        ),
                        redirect_uri: this.configService.get(
                                `${party}_redirect_url`
                        ),
                        grant_type: "authorization_code",
                };

                try {
                        const accessToken = await provider.getToken(code, args);

                        const userInfo = await provider.getUserInfo(
                                accessToken
                        );

                        const s = this.loginProviders.encrypter(
                                JSON.stringify(userInfo),
                                this.configService.get("encrypt_code")
                        );

                        return { s, ...userInfo };
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

import { makeResponseObj, responseObj } from "../../@types/response";
import axios from "axios";

export interface userInfoDTO {
        id: string | number;
        name: string;
        email: string;
        pic?: string;
}

interface OAuthRedirectDTO {
        clientId: string;
        redirectUrl: string;
}

export class reqTokenDTO {
        client_id: string;
        client_secret: string;
        redirect_uri: string;
        grant_type: string;
}

// abstract factory pattern을 사용해보자..
abstract class OAuthService {
        tokenUrl: string;
        exchangeTokenUrl: string;

        abstract redirectToProvider(args: OAuthRedirectDTO): string;
        // abstract handleCallback(): void;

        storeToken() {
                console.log(`storing token..`);
        }
}

export class GoogleOAuth extends OAuthService {
        static tokenUrl = "https://oauth2.googleapis.com/token";
        static exchangeTokenUrl =
                "https://www.googleapis.com/oauth2/v2/userinfo";

        redirectToProvider(args: OAuthRedirectDTO): string {
                const clientId = args.clientId;
                const redirectUrl = args.redirectUrl;

                const url =
                        `https://accounts.google.com/o/oauth2/v2/auth` +
                        `?client_id=${clientId}` +
                        `&redirect_uri=${redirectUrl}` +
                        `&response_type=code` +
                        `&scope=email profile openid`;

                return url;
        }

        async getToken(code, reqTokenDTO: reqTokenDTO) {
                const codeForToken = code.code;

                try {
                        const response = await axios.post(
                                // static 변수는 class 명에서 뽑아쓴다.
                                GoogleOAuth.tokenUrl,
                                {
                                        code: codeForToken,
                                        ...reqTokenDTO,
                                }
                        );

                        return response.data.access_token;
                } catch (e) {
                        console.error(e);
                        return makeResponseObj(1, "google login failed");
                }
        }

        async getUserInfo(access_token: string) {
                try {
                        const response = await axios.get(
                                GoogleOAuth.exchangeTokenUrl,
                                {
                                        // Request Header에 Authorization 추가
                                        headers: {
                                                Authorization: `Bearer ${access_token}`,
                                        },
                                }
                        );

                        const googleData = response.data;

                        const userInfo: userInfoDTO = {
                                id: googleData.id,
                                email: googleData.email,
                                name: googleData.name,
                                pic: googleData.picture,
                        };

                        return userInfo;
                } catch (e) {
                        console.log(e);
                        return makeResponseObj(1, "google login failed");
                }
        }
}

import axios from "axios";
import { RepositoryNotTreeError } from "typeorm";

export interface userInfoDTO {
        id: string | number;
        name: string;
        email: string;
        pic?: string;
}

// TOTHINK : 이런 것까지 굳이 타입을 만들어서 쓸 필요가 있나?
// 이건 어차피프론트에서 데이터 전달하는 것도 아니고 백엔드에서만 상수적으로 사용하는거니까
// 타입을 정의할 필요없을 것 같은데?
// 그냥 인수 두개 따로 줘도 됨..
// interface OAuthRedirectDTO {
//         clientId: string;
//         redirectUrl: string;
// }

export interface reqTokenDTO {
        client_id: string;
        client_secret: string;
        redirect_uri: string;
        grant_type: string;
}

// abstract factory pattern을 사용해보자..
abstract class OAuthService {
        oAuthUrl: string;
        tokenUrl: string;
        exchangeTokenUrl: string;

        abstract redirectToProvider(clientId, redirectUrl): string;
        abstract getToken(code, reqTokenDTO: reqTokenDTO);
        abstract getUserInfo(access_token: string);
}

// 구글과 카카오는 oauth login이 거의 동일하다. 구체적인 value만 다른 수준임.
// 그런데 앞으로 또 다른 oauth 3rd patry가 추가되었을 때 그 쪽도 같ㅇ느 거란 보장이 있나?
// 기본 골자야 같겠지만..
// 3rd party 별로 class 구현을 나누는게 지금으로서는 좋아보임.
export class GoogleOAuth extends OAuthService {
        static oAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
        static tokenUrl = "https://oauth2.googleapis.com/token";
        static exchangeTokenUrl =
                "https://www.googleapis.com/oauth2/v2/userinfo";

        redirectToProvider(clientId, redirectUrl): string {
                const redirect_url =
                        `${GoogleOAuth.oAuthUrl}` +
                        `?client_id=${clientId}` +
                        `&redirect_uri=${redirectUrl}` +
                        `&response_type=code` +
                        `&scope=email profile openid`;

                return redirect_url;
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

                        const accessToken = response.data.access_token;
                        return { status: 0, token: accessToken };
                } catch (e) {
                        console.error(e);
                        return {
                                status: 1,
                                msg: "failed to get access token",
                        };
                }
        }

        async getUserInfo(access_token: string) {
                try {
                        const response = await axios.get(
                                GoogleOAuth.exchangeTokenUrl,
                                {
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

                        return { status: 0, userInfo: userInfo };
                } catch (e) {
                        console.log(e);
                        return {
                                status: 1,
                                msg: "failed to get user information",
                        };
                }
        }
}

export class KakaoOauth extends OAuthService {
        static oAuthUrl = "https://kauth.kakao.com/oauth/authorize";
        static tokenUrl = "https://kauth.kakao.com/oauth/token";
        static exchangeTokenUrl = "https://kapi.kakao.com/v2/user/me";

        redirectToProvider(clientId: any, redirectUrl: any): string {
                const redirect_url =
                        `${KakaoOauth.oAuthUrl}` +
                        `?client_id=${clientId}` +
                        `&redirect_uri=${redirectUrl}` +
                        `&response_type=code`;

                return redirect_url;
        }

        async getToken(code: any, reqTokenDTO: reqTokenDTO) {
                const codeForToken = code.code;

                const qs =
                        `grant_type=authorization_code` +
                        `&client_id=${reqTokenDTO.client_id}` +
                        `&client_secret=${reqTokenDTO.client_secret}` +
                        `&redirectUri:${reqTokenDTO.redirect_uri}` +
                        `&code=${codeForToken}`;

                const headers = {
                        "Content-type": "application/x-www-form-urlencoded",
                };

                try {
                        const response = await axios.post(
                                KakaoOauth.tokenUrl,
                                qs,
                                {
                                        headers: headers,
                                }
                        );

                        return { status: 0, result: response.data };
                } catch (e) {
                        console.error(e);
                        return {
                                status: 1,
                                msg: "failed to get access token",
                        };
                }
        }

        async getUserInfo(tokenResult) {
                try {
                        const response = await axios.get(
                                KakaoOauth.exchangeTokenUrl,
                                {
                                        headers: {
                                                Authorization: `${tokenResult.token_type} ${tokenResult.access_token}`,
                                        },
                                }
                        );

                        const userInfo = {
                                id: response.data.id,
                                name: response.data.properties.nickname,
                                email: response.data.kakao_account.email,
                                pic: response.data.properties.thumbnail_image,
                        };

                        console.log(userInfo);

                        return { status: 0, userInfo };
                } catch (e) {
                        console.log(e);
                        return {
                                status: 1,
                                msg: "failed to get user information",
                        };
                }
        }
}

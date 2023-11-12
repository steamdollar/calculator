import { ErrorMessage } from "../../@types/error";
import axios from "axios";
import { encrypter } from "./login.util";
import { Ids } from "../../models/ids.model";

export interface userInfoDTO {
        id: string | number;
        name: string;
        email: string;
        pic?: string;
}

// 이런 것까지 굳이 타입을 만들어서 쓸 필요가 있나?
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

const isRegistered = async (party, id) => {
        const isRegistered = await Ids.findOne({
                where: {
                        ids: id,
                        party: party,
                },
        });

        if (isRegistered === null) {
                await Ids.create({ party, ids: id });
        }
};

// abstract factory pattern을 사용해보자..
abstract class OAuthService {
        oAuthUrl: string;
        tokenUrl: string;
        exchangeTokenUrl: string;

        abstract redirectToProvider(clientId, redirectUrl): string;
        abstract getToken(code, reqTokenDTO: reqTokenDTO);
        abstract getUserInfo(access_token: string);
}

export interface IOAuthProvider {
        redirectToProvider(clientId: string, redirectUrl: string): string;
        getToken(code: string, reqTokenDTO: reqTokenDTO);
        getUserInfo(token: any): Promise<userInfoDTO> | null;
}

// 구글과 카카오는 oauth login이 거의 동일하다. 구체적인 value만 다른 수준임.
// 그런데 앞으로 또 다른 oauth 3rd patry가 추가되었을 때 그 쪽도 같을 거란 보장이 있나?
// 기본 골자야 같겠지만..
// 3rd party 별로 class 구현을 나누는게 지금으로서는 좋아보임.
export class GoogleOAuth extends OAuthService implements IOAuthProvider {
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
                try {
                        const response = await axios.post(
                                // static 변수는 class 명에서 뽑아쓴다.
                                GoogleOAuth.tokenUrl,
                                {
                                        code,
                                        ...reqTokenDTO,
                                }
                        );

                        const accessToken = response.data.access_token;

                        return accessToken;
                } catch (e) {
                        console.error(e);
                        throw new ErrorMessage("failed to get google token");
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

                        await isRegistered("google", response.data.id);

                        const userInfo: userInfoDTO = {
                                id: +googleData.id,
                                email: googleData.email,
                                name: googleData.name,
                                pic: googleData.picture,
                        };

                        return userInfo;
                } catch (e) {
                        console.log(e);
                        throw new ErrorMessage(
                                "failed to exchange google token to user info."
                        );
                }
        }
}

// TODO : type 명확히 지정
export class KakaoOauth extends OAuthService implements IOAuthProvider {
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

        async getToken(code, reqTokenDTO: reqTokenDTO) {
                const qs =
                        `grant_type=authorization_code` +
                        `&client_id=${reqTokenDTO.client_id}` +
                        `&client_secret=${reqTokenDTO.client_secret}` +
                        `&redirectUri:${reqTokenDTO.redirect_uri}` +
                        `&code=${code}`;

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

                        return response.data;
                } catch (e) {
                        console.error(e);
                        throw new ErrorMessage("failed to get kakao token");
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

                        await isRegistered("kakao", response.data.id);

                        // id도 같이 클라이언트에 줘야 요청 받고 이게 누구 요청인지 확인 가능
                        const userInfo = {
                                id: response.data.id,
                                name: response.data.properties.nickname,
                                email: response.data.kakao_account.email,
                                pic: response.data.properties.thumbnail_image,
                        };

                        return userInfo;
                } catch (e) {
                        console.log(e);
                        throw new ErrorMessage(
                                "failed to exchange kakao token to user info."
                        );
                }
        }
}

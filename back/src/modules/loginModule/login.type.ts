import axios from "axios";

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
interface OAuthRedirectDTO {
        clientId: string;
        redirectUrl: string;
}

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

        abstract redirectToProvider(args: OAuthRedirectDTO): string;
        abstract getToken(code, reqTokenDTO: reqTokenDTO);
        abstract getUserInfo(access_token: string);
}

export class GoogleOAuth extends OAuthService {
        static oAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
        static tokenUrl = "https://oauth2.googleapis.com/token";
        static exchangeTokenUrl =
                "https://www.googleapis.com/oauth2/v2/userinfo";

        redirectToProvider(args: OAuthRedirectDTO): string {
                const clientId = args.clientId;
                const redirectUrl = args.redirectUrl;

                const url =
                        `${GoogleOAuth.oAuthUrl}` +
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

import axios from "axios";

export interface userInfo {
        id: string | number;
        name: string;
        email: string;
        pic?: string;
}

export interface OAuthRedirectDTO {
        clientId: string;
        redirectUrl: string;
}

abstract class OAuthService {
        tokenUrl: string;
        accessToken: any;

        abstract redirectToProvider(args: OAuthRedirectDTO): string;
        // abstract handleCallback(): void;

        storeToken() {
                console.log(`storing token..`);
        }
}

export class GoogleOAuth extends OAuthService {
        tokenUrl = "https://oauth2.googleapis.com/token";
        accessToken;

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

        async getToken(code) {
                const url = this.tokenUrl;
                const codeForToken = code.code;

                let accessToken;

                try {
                        const response = await axios.post(url, {
                                code: codeForToken,
                        });
                } catch (e) {}
        }
}

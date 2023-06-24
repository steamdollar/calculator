export interface coinInfoDTO {
        token: string;
        symbol: string;
        chain: string;
        ca: string;
}

export interface addressForCheck {
        address: string;
        chain: string;
}

export interface addressInfo {
        isToken: boolean;
        msg?: string;
        decimals?: number;
        name?: string;
        symbol?: string;
}

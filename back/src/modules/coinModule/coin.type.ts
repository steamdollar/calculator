export interface coinInfoDTO {
        chain: string;
        ca: string;
        symbol: string;
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

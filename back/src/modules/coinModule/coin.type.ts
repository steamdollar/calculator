export interface coinInfoDTO {
        chain?: string;
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

export interface networkInfo {
        network: string;
}

export interface coinListResponse {
        chain: string;
        coinList: coinInfoDTO[];
        status: number;
        msg: string;
}

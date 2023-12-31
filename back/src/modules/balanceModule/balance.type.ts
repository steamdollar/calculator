export interface balance {
        name: string;
        balance: string;
        symbol: string;
        price?: any;
}

export interface balanceResponse {
        status: number;
        balances: balance[];
}

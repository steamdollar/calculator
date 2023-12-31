export interface SavedData {
    date : Date;
    position : boolean;
    wallet? : string
    tolerance : number;
    entry : number;
    sl: number;
    tp : number;
    ticker : string;
    result? : boolean;
    memo? : string;
}

export interface receivedDataForSave {
    position : boolean;
    tolerance : number;
    entry : number;
    sl : number;
    tp : number;
    ticker : string;
}
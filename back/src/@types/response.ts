export class responseObj {
        status: number;
        msg: string;
}

export function makeResponseObj(status: number, msg: string): responseObj {
        return { status, msg };
}

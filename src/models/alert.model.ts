export class Alert {
    msg: string;
    type: AlertType

    constructor(msg: string, type: AlertType) {
        this.msg = msg;
        this.type = type;
    }
}

export enum AlertType {
    Success,
    Error,
    Info,
    Close
}
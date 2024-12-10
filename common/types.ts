
/** Message representing an error*/
export interface IErrorMsg {
    type: "error",
    msg: string
}

/** Acknowledgement message*/
export interface IAckMsg {
    type: 'ack',
    msg: string
}

/** Message format for creating a game*/
export interface ICreateMsg {
    type: "create",
    gameID: string,
    hostName: string,
    gameTitle: string,
    board: number[]
}

/** Message format for joining a game*/
export interface IJoinMsg {
    gameID: string,
    type: "join",
    hostName: string,
    board: number[]
}
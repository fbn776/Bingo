export interface IMessage {
    type: "error" | "ack" | "create" | "join" | "player-joined";
}

/** Message representing an error*/
export interface IErrorMsg extends IMessage {
    type: "error",
    msg: string
}

/** Types of Acknowledgement*/
export type TAckFor = 'create-reply' | 'join-reply';

/** Acknowledgement message*/
export interface IAckMsg extends IMessage {
    type: 'ack',
    /** Type of the acknowledgement*/
    subtype?: 'error' | 'info',
    /** What the acknowledgement is for*/
    ack_for: TAckFor,
    msg?: string,
    data?: any
}

/** Message format for creating a game*/
export interface ICreateMsg extends IMessage {
    type: "create",
    gameID: string,
    hostName: string,
    gameTitle: string,
    board: number[]
}

/** Message format for joining a game*/
export interface IJoinMsg extends IMessage {
    gameID: string,
    type: "join",
    guestName: string,
    board: number[]
}

export interface IPlayerJoined extends IMessage {
    type: "player-joined",
    guestName: string
}
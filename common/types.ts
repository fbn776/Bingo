export interface IMessage {
    type: "error" | "ack" | "create" | "join" | "player-joined" | "move" | "info-move";
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

/**
 * Used by the playing player to send msg to the backend to inform that the player has selected a cell
 */
export interface IPlayerMove extends IMessage {
    gameID: string,
    type: "move",
    /** What's the selected cell (number)*/
    selected: number,
    by: "host" | "guest"
}

/**
 * Used by the backend to inform the other player that the playing player has selected a cell
 */
export interface IInformOtherPlayersMove extends IMessage {
    type: "info-move",
    selected: number,
}

/** The type format of a board state*/
export type TLocalBoardCell = {
    num: number,
    selected: boolean
}
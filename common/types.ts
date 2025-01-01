export interface IMessage {
    type: "error" | "ack" | "create" | "join" | "player-joined" | "move" | "info-move" | "say-bingo" | "won-bingo" | "replay-game";
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
export interface IInformPlayersMove extends IMessage {
    type: "info-move",
    selected: number,
    noOfBingo: number,
    currTurn: "host" | "guest",
    /** Might be redundant as the other current turn if the player who played*/
    playedBy: "host" | "guest"
}

export interface ISayBingo extends IMessage {
    type: "say-bingo",
    by: "guest" | "host",
    gameID: string,
}

export interface IWonBingo extends IMessage {
    type: "won-bingo",
    won: "host" | "guest",
    to: "host" | "guest"
}

/** The type format of a board state*/
export type TLocalBoardCell = {
    num: number,
    selected: boolean
}


export interface IReplayGame extends IMessage {
    type: "replay-game",
    gameID: string
}

export interface IReplayGameAck extends IMessage {
    type: "replay-game",
    gameID: string,
    ack: "yes" | "no"
}
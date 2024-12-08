import WebSocket from "ws";

export type TPlayer = {
    ws: WebSocket,
    name: string
}

export interface GameInstance {
    /** The player who started the game*/
    host: TPlayer | null,
    /** Player who joined*/
    guest: TPlayer | null,
    /** Title of the game*/
    gameTitle: string,

    /** Unix timestamp for when this data was created*/
    createdAt: number,
}



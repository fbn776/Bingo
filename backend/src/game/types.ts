import WebSocket from "ws";
import {TLocalBoardCell} from "../../../common/types";

export type TPlayer = {
    ws: WebSocket,
    name: string,
    /** The player's board format 1 to 25 numbers*/
    board: number[]
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

    /** The current turn of the game*/
    currentTurn?: "host" | "guest",

    /** The current state of the game
     *
     * Each number in the board (1 to 25) and a boolean value to indicate if it has been selected
     * */
    currentState: TLocalBoardCell[]
}



import {GameInstance} from "./types";
import {ICreateMsg, IJoinMsg} from "../../../common/types";
import {WebSocket} from "ws";
import {GameAlreadyExistsError, GameFullError, NoGameFoundError} from "./errors";


/**
 * A central store for all game instances
 */
export default class GameStore {
    private static gameData: Map<string, GameInstance> = new Map();

    static hasGame(gameID: string) {
        return this.gameData.has(gameID);
    }

    static getGame(gameID: string) {
        return this.gameData.get(gameID);
    }

    static setGame(gameID: string, game: GameInstance) {
        this.gameData.set(gameID, game);
    }

    static deleteGame(gameID: string) {
        this.gameData.delete(gameID);
    }

    /**
     * Create a new game, if game already exists, throw an error
     * @param gameID
     * @param data
     */
    static createGame(gameID: string, data: ICreateMsg & { ws: WebSocket }) {
        if (this.hasGame(gameID)) {
            throw new GameAlreadyExistsError();
        }

        this.gameData.set(gameID, {
            createdAt: Date.now(),
            guest: null,
            host: {
                name: data.hostName,
                ws: data.ws,
                board: data.board
            },
            gameTitle: data.gameTitle,
        });
    }

    /**
     * Join a game, if game doesn't exist or already has 2 players, throw an error
     * @param gameID
     * @param data
     */
    static joinGame(gameID: string, data: IJoinMsg & { ws: WebSocket }) {
        if (!this.hasGame(data.gameID)) {
            throw new NoGameFoundError();
        }

        const currGame = this.getGame(data.gameID)!;

        if (currGame.guest) {
            throw new GameFullError();
        }

        this.gameData.set(data.gameID, {
            ...currGame,
            guest: {
                name: data.guestName,
                ws: data.ws,
                board: data.board
            }
        });
    }
}
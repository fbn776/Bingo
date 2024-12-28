import {IAckMsg, IJoinMsg, IPlayerJoined} from "../../../common/types";
import WebSocket from "ws";
import Logger from "../lib/Logger";
import sendMsg from "../lib/utils";
import GameStore from "./store";
import {GameFullError, NoGameFoundError} from "./errors";


export function joinGame(data: IJoinMsg, ws: WebSocket) {
    try {
        GameStore.joinGame({
            ...data,
            ws
        });

        const game = GameStore.getGame(data.gameID)!;

        // Send message to host that a player joined
        sendMsg<IPlayerJoined>(game.host!.ws, {
            type: "player-joined",
            guestName: data.guestName
        });

        Logger.info(`Guest player(${data.guestName}) has joined game with ID: ${data.gameID}`);
        sendMsg<IAckMsg>(ws, {
            type: 'ack',
            ack_for: 'join-reply',
            data: {
                host: game.host?.name,
                gameTitle: game.gameTitle,
                currentTurn: game.currentTurn
            }
        });

    } catch (e) {
        console.error(e)
        if (e instanceof NoGameFoundError) {
            sendMsg<IAckMsg>(ws, {
                type: 'ack',
                subtype: 'error',
                ack_for: 'join-reply',
                msg: 'Game does not exists'
            });
            return;
        } else if (e instanceof GameFullError) {
            sendMsg<IAckMsg>(ws, {
                type: 'ack',
                subtype: 'error',
                ack_for: 'join-reply',
                msg: 'Game already full'
            });
            return;
        }
    }
}
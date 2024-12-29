import {IAckMsg, ICreateMsg} from "../../../../common/types";
import WebSocket from "ws";
import gameData from "../store";
import GameStore from "../store";
import sendMsg from "../../lib/utils";
import Logger from "../../lib/Logger";

export function createGame(data: ICreateMsg, ws: WebSocket) {
    try {
        GameStore.createGame(data.gameID, {
            ...data,
            ws
        });

        // Success message back to client
        Logger.info(`Host player(${data.hostName}) has created game with ID: ${data.gameID}`);
        Logger.info(`Sending ACK to host player(${data.hostName})`);
        sendMsg<IAckMsg>(ws, {
            type: 'ack',
            ack_for: 'create-reply',
            data: {
                currentTurn: GameStore.getGame(data.gameID)?.currentTurn
            }
        })
    } catch (e) {
        if (gameData.hasGame(data.gameID)) {
            sendMsg<IAckMsg>(ws, {
                type: 'ack',
                ack_for: 'join-reply',
                subtype: 'error',
                msg: 'GameID already exists'
            });
            return;
        }
    }

}
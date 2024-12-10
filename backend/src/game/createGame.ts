import {IAckMsg, ICreateMsg, IErrorMsg} from "../../../common/types";
import WebSocket from "ws";
import gameData from "./store";
import sendMsg from "../lib/utils";
import GameStore from "./store";

export function createGame(data: ICreateMsg, ws: WebSocket) {
    try {
        GameStore.createGame(data.gameID, {
            ...data,
            ws
        });

        // Success message back to client
        sendMsg<IAckMsg>(ws, {
            type: 'ack',
            msg: 'Created game'
        })
    } catch (e) {
        if (gameData.hasGame(data.gameID)) {
            sendMsg(ws, {
                type: 'error',
                msg: 'GameID already exists'
            } as IErrorMsg);
            return;
        }
    }

}
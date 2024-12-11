import {IAckMsg, ICreateMsg, IErrorMsg} from "../../../common/types";
import WebSocket from "ws";
import gameData from "./store";
import sendMsg from "../lib/utils";
import GameStore from "./store";
import Logger from "../lib/Logger";

export function createGame(data: ICreateMsg, ws: WebSocket) {
    try {
        GameStore.createGame(data.gameID, {
            ...data,
            ws
        });

        // Success message back to client
        Logger.info(`Host player(${data.hostName}) has created game with ID: ${data.gameID}`);
        setTimeout(() => {
            Logger.info(`Sending ACK to host player(${data.hostName})`);
            sendMsg<IAckMsg>(ws, {
                type: 'ack',
                msg: 'Created game'
            })
        }, 3000);
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
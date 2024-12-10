import {IAckMsg, IErrorMsg, IJoinMsg} from "../../../common/types";
import WebSocket from "ws";
import Logger from "../lib/Logger";
import sendMsg from "../lib/utils";
import GameStore from "./store";
import {GameFullError, NoGameFoundError} from "./errors";

export function joinGame(data: IJoinMsg, ws: WebSocket) {
    try {
        GameStore.joinGame(data.gameID, {
            ...data,
            ws
        });

        Logger.info(`Guest player(${data.hostName}) has joined game with ID: ${data.gameID}`);

        sendMsg<IAckMsg>(ws, {
            type: 'ack',
            msg: 'Joined game'
        })
    } catch (e) {
        if(e instanceof NoGameFoundError) {
            sendMsg(ws, {
                type: 'error',
                msg: 'Game does not exists'
            } as IErrorMsg);
            return;
        } else if(e instanceof GameFullError) {
            sendMsg(ws, {
                type: 'error',
                msg: 'Game already full'
            } as IErrorMsg);
            return;
        }
    }
}